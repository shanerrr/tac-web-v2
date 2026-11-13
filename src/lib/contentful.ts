/**
 * Content from Contentful's Delivery API (read-only), fetched while the site builds.
 * The site is static, so a change published in Contentful appears after the next deploy.
 * A failed request fails the build rather than shipping pages without their content.
 */

export interface Photo {
	url: string;
	width?: number;
	height?: number;
	alt: string;
}

export interface Story {
	id: string;
	format: 'written' | 'film';
	name: string;
	age: number;
	pronouns?: string;
	location: string;
	/** Films: the film's title. */
	headline?: string;
	quote?: string;
	image: Photo;
	youtubeUrl?: string;
	durationMinutes?: number;
	publishedAt: Date;
	/** Written follow-ups are reached from another story rather than listed. */
	inFeed: boolean;
}

type Link = { sys: { id: string } } | undefined;
type Asset = {
	sys: { id: string };
	fields: { file?: { url: string; details?: { image?: { width: number; height: number } } } };
};

const { CONTENTFUL_SPACE_ID: space, CONTENTFUL_ACCESS_TOKEN: token } = import.meta.env;
const environment = import.meta.env.CONTENTFUL_ENVIRONMENT || 'master';

async function entries(contentType: string) {
	if (!space || !token) throw new Error('Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN (see .env).');
	const url = `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?content_type=${contentType}&limit=1000&include=1`;
	const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) throw new Error(`Contentful ${contentType}: ${res.status} ${await res.text()}`);
	const { items, includes } = await res.json();
	const assets = new Map<string, Asset>((includes?.Asset ?? []).map((a: Asset) => [a.sys.id, a]));
	const photo = (link: Link, alt: string): Photo => {
		const file = link && assets.get(link.sys.id)?.fields.file;
		if (!file) throw new Error(`Contentful ${contentType}: missing image for "${alt}"`);
		return { url: `https:${file.url}`, ...file.details?.image, alt };
	};
	return { items: items as { sys: { id: string }; fields: Record<string, any> }[], photo };
}

// Contentful stores the possessive ("her"), the site shows the pronoun pair.
const PRONOUNS: Record<string, string> = { her: 'she/her', his: 'he/him', their: 'they/them' };

/** Written stories and films together, newest first. */
export async function getStories(): Promise<Story[]> {
	const [written, films] = await Promise.all([entries('stories'), entries('films')]);
	const pronounsOf = new Map(written.items.map((s) => [s.sys.id, PRONOUNS[s.fields.pronoun]]));

	const stories: Story[] = [
		...written.items.map(({ sys, fields: f }): Story => ({
			id: sys.id,
			format: 'written',
			name: f.name,
			age: f.age,
			pronouns: PRONOUNS[f.pronoun],
			location: f.location,
			quote: f.quote,
			image: written.photo(f.portrait, `Portrait of ${f.name}`),
			publishedAt: new Date(f.published),
			inFeed: f.show !== false,
		})),
		...films.items.map(({ sys, fields: f }): Story => {
			const name = String(f.name).replace(/[’']s Story$/, '');
			return {
				id: sys.id,
				format: 'film',
				name,
				age: f.age,
				// Films carry no pronouns of their own; they share them with the written story they're linked to.
				pronouns: f.story && pronounsOf.get(f.story.sys.id),
				location: f.location,
				headline: f.title,
				image: films.photo(f.banner, `${name} in the film “${f.title}”`),
				youtubeUrl: f.youtubeUrl,
				durationMinutes: Number.parseInt(f.duration, 10) || undefined,
				publishedAt: new Date(f.published),
				inFeed: true,
			};
		}),
	];
	return stories.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}
