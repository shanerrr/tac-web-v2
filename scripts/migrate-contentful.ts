/**
 * One-off migration: Contentful (Delivery API, read-only) → EmDash (REST API).
 *
 *   bun scripts/migrate-contentful.ts                       # local dev server (dev-bypass auth)
 *   EMDASH_URL=https://… EMDASH_TOKEN=… bun scripts/migrate-contentful.ts
 *
 * Needs CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN (bun loads .env).
 * Refuses to run if the target already has stories, so it can't import twice.
 * Delete this script once production is migrated.
 */

type Json = any; // Contentful and EmDash payloads are both loosely typed JSON here.

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ENVIRONMENT = 'master' } = process.env;
const BASE = (process.env.EMDASH_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const MAX_EDGE = 3000; // ponytail: originals up to 31 MB are resized by Contentful's image API before upload.
if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) throw new Error('Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN');

// ── Contentful ───────────────────────────────────────────────────────────────

async function contentful(path: string): Promise<Json[]> {
	const url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/${path}`;
	const items: Json[] = [];
	for (let skip = 0; ; ) {
		const r = await fetch(`${url}${url.includes('?') ? '&' : '?'}limit=1000&skip=${skip}`, {
			headers: { Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}` },
		});
		if (!r.ok) throw new Error(`Contentful ${path}: ${r.status} ${await r.text()}`);
		const page = await r.json();
		items.push(...page.items);
		skip += page.items.length;
		if (skip >= page.total || !page.items.length) return items;
	}
}

// ── EmDash ───────────────────────────────────────────────────────────────────

const headers: Record<string, string> = {};
if (process.env.EMDASH_TOKEN) {
	headers.Authorization = `Bearer ${process.env.EMDASH_TOKEN}`;
} else {
	if (!['localhost', '127.0.0.1'].includes(new URL(BASE).hostname)) throw new Error('Set EMDASH_TOKEN for a non-local EMDASH_URL');
	const r = await fetch(`${BASE}/_emdash/api/auth/dev-bypass`, { redirect: 'manual' });
	const cookie = r.headers.getSetCookie().map((c) => c.split(';')[0]).join('; ');
	if (!cookie) throw new Error(`Dev bypass failed (${r.status}). Is \`astro dev\` running and setup complete?`);
	Object.assign(headers, { Cookie: cookie, 'X-EmDash-Request': '1' });
}

async function api(method: string, path: string, body?: Json): Promise<Json> {
	const isForm = body instanceof FormData;
	const r = await fetch(`${BASE}/_emdash/api${path}`, {
		method,
		headers: isForm || !body ? headers : { ...headers, 'Content-Type': 'application/json' },
		body: isForm ? body : body && JSON.stringify(body),
	});
	const res = await r.json().catch(() => ({ success: false, error: { message: `HTTP ${r.status}` } }));
	if (!res.success) throw new Error(`${method} ${path}: ${r.status} ${JSON.stringify(res.error)}`);
	return res.data;
}

const toReview: string[] = [];

// ── Helpers ──────────────────────────────────────────────────────────────────

const slugify = (s: string) =>
	s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** "LAC-SUPERIEUR, QC" → "Lac-Superieur, QC"; "ST. JOHN'S" → "St. John's". */
const titleCase = (s: string) => s.toLowerCase().replace(/(^|[\s\-.])(\p{L})/gu, (_, b, c) => b + c.toUpperCase());
const titleCasePlace = (s: string) => {
	const [place, prov] = s.split(/,\s*/);
	return prov ? `${titleCase(place)}, ${prov.toUpperCase()}` : titleCase(place);
};
const iso = (d: string) => new Date(d).toISOString();

/** Contentful rich text → Portable Text. Throws on anything this content doesn't use, so nothing is dropped silently. */
function portableText(doc: Json): Json[] | undefined {
	if (!doc) return undefined;
	let n = 0;
	const key = () => `k${(n++).toString(36)}`;
	const MARKS: Record<string, string> = { italic: 'em', bold: 'strong', underline: 'underline' };
	return doc.content.map((block: Json) => {
		if (block.nodeType !== 'paragraph') throw new Error(`Unhandled rich text block: ${block.nodeType}`);
		const markDefs: Json[] = [];
		const children: Json[] = [];
		const walk = (node: Json, marks: string[]) => {
			if (node.nodeType === 'text') {
				const own = node.marks.map((m: Json) => MARKS[m.type] ?? (() => { throw new Error(`Unhandled mark: ${m.type}`); })());
				children.push({ _type: 'span', _key: key(), text: node.value, marks: [...marks, ...own] });
			} else if (node.nodeType === 'hyperlink') {
				const k = key();
				markDefs.push({ _type: 'link', _key: k, href: node.data.uri });
				for (const c of node.content) walk(c, [...marks, k]);
			} else throw new Error(`Unhandled rich text node: ${node.nodeType}`);
		};
		for (const c of block.content) walk(c, []);
		return { _type: 'block', _key: key(), style: 'normal', markDefs, children };
	});
}

// ── Media ────────────────────────────────────────────────────────────────────

const uploaded = new Map<string, Json>();

async function uploadBytes(url: string, filename: string, mimeType?: string, alt?: string, thumbnailUrl?: string): Promise<Json> {
	const r = await fetch(url);
	if (!r.ok) throw new Error(`Download ${url}: ${r.status}`);
	const form = new FormData();
	const type = mimeType ?? r.headers.get('content-type')?.split(';')[0] ?? 'application/octet-stream';
	form.set('file', new File([await r.arrayBuffer()], filename, { type }));
	if (alt !== undefined) form.set('alt', alt);
	if (thumbnailUrl) {
		// A small thumbnail lets EmDash build the blur placeholder without decoding the full image.
		const t = await fetch(thumbnailUrl);
		if (t.ok) form.set('thumbnail', new File([await t.arrayBuffer()], 'thumb.jpg', { type: 'image/jpeg' }));
	}
	return (await api('POST', '/media', form)).item;
}

// EmDash rejects null for optional media metadata (e.g. no blurhash), so drop empty keys.
const compact = (o: Json) => Object.fromEntries(Object.entries(o).filter(([, v]) => v != null));
const imageValue = (m: Json) => compact({
	id: m.id, provider: 'local', alt: m.alt ?? '', width: m.width, height: m.height,
	filename: m.filename, mimeType: m.mimeType, blurhash: m.blurhash, dominantColor: m.dominantColor,
	meta: { storageKey: m.storageKey },
});
const fileValue = (m: Json) => compact({
	id: m.id, provider: 'local', filename: m.filename, mimeType: m.mimeType, size: m.size, meta: { storageKey: m.storageKey },
});

async function image(assetId: string | undefined, alt: string): Promise<Json | undefined> {
	if (!assetId) return undefined;
	if (!uploaded.has(assetId)) {
		const a = assets.get(assetId);
		if (!a) throw new Error(`Missing Contentful asset ${assetId}`);
		const f = a.fields.file;
		const src = `https:${f.url}`;
		const { width = 0, height = 0 } = f.details.image ?? {};
		const isJpeg = f.contentType === 'image/jpeg';
		const resize = Math.max(width, height) > MAX_EDGE ? `${width >= height ? 'w' : 'h'}=${MAX_EDGE}${isJpeg ? '&fm=jpg&q=85' : ''}` : '';
		const media = await uploadBytes(resize ? `${src}?${resize}` : src, f.fileName, f.contentType, alt, `${src}?w=64&h=64&fit=thumb&fm=jpg`);
		uploaded.set(assetId, imageValue(media));
	}
	return { ...uploaded.get(assetId), alt };
}

// ── Load Contentful ──────────────────────────────────────────────────────────

console.log('Reading Contentful…');
const [entries, assetList] = await Promise.all([contentful('entries?include=0'), contentful('assets')]);
const assets = new Map(assetList.map((a) => [a.sys.id, a]));
const ofType = (t: string) => entries.filter((e) => e.sys.contentType.sys.id === t);
const byDate = (a: Json, b: Json) => Date.parse(a.fields.published) - Date.parse(b.fields.published);

const existing = await api('GET', '/content/stories?limit=1');
if (existing.items?.length) throw new Error('Target already has stories; refusing to import twice.');

// ── Stories and films → stories ──────────────────────────────────────────────

console.log('Stories…');
const PRONOUNS: Record<string, string> = { her: 'she/her', his: 'he/him', their: 'they/them' };
const written = ofType('stories').sort((a, b) => Number(b.fields.show) - Number(a.fields.show) || byDate(a, b));
const films = ofType('films').sort(byDate);
const storyId = new Map<string, string>(); // Contentful id → EmDash id
const usedSlugs = new Set<string>();
const slugFor = (name: string, film: boolean) => {
	const base = slugify(name);
	let slug = usedSlugs.has(base) && film ? `${base}-film` : base;
	for (let i = 2; usedSlugs.has(slug); i++) slug = `${base}-${i}`;
	usedSlugs.add(slug);
	return slug;
};
const pending: { id: string; publishedAt: string; related: string[] }[] = [];

for (const e of written) {
	const f = e.fields;
	if (f.pronoun && !PRONOUNS[f.pronoun]) throw new Error(`Unknown pronoun "${f.pronoun}" on ${f.title}`);
	const data = {
		format: 'written',
		name: f.name,
		age: f.age,
		pronouns: PRONOUNS[f.pronoun],
		location: f.location,
		// Contentful titles were "Name, 53 yrs"; keep only the ones that say something else.
		headline: f.title === `${f.name}, ${f.age} yrs` ? undefined : f.title,
		quote: f.quote,
		image: await image(f.portrait?.sys.id, `Portrait of ${f.name}`),
		body: portableText(f.body),
		in_feed: f.show,
	};
	const slug = slugFor(f.name, false);
	const { item } = await api('POST', '/content/stories', { data, slug, status: 'draft', createdAt: iso(e.sys.createdAt) });
	storyId.set(e.sys.id, item.id);
	pending.push({ id: item.id, publishedAt: iso(f.published), related: (f.related ?? []).map((r: Json) => r.sys.id) });
	console.log(`  /stories/${slug}${f.show ? '' : '  (not in feed)'}`);
}

for (const e of films) {
	const f = e.fields;
	const name = f.name.replace(/[’']s Story$/, '');
	const linked = f.story && written.find((s) => s.sys.id === f.story.sys.id);
	const data = {
		format: 'film',
		name,
		age: f.age,
		pronouns: linked ? PRONOUNS[linked.fields.pronoun] : undefined,
		location: f.location,
		headline: f.title,
		image: await image(f.banner?.sys.id, `${name} in the film “${f.title}”`),
		youtube_url: f.youtubeUrl,
		duration_minutes: Number.parseInt(f.duration, 10),
		in_feed: true,
	};
	if (!linked) toReview.push(`Film "${f.title}": no pronouns in Contentful; set them in the admin.`);
	const slug = slugFor(name, true);
	const { item } = await api('POST', '/content/stories', { data, slug, status: 'draft', createdAt: iso(e.sys.createdAt) });
	storyId.set(e.sys.id, item.id);
	pending.push({ id: item.id, publishedAt: iso(f.published), related: f.story ? [f.story.sys.id] : [] });
	console.log(`  /stories/${slug}`);
}

for (const p of pending) {
	const related = p.related.map((id) => storyId.get(id)).filter(Boolean);
	if (related.length) await api('PUT', `/content/stories/${p.id}`, { references: { related } });
	await api('POST', `/content/stories/${p.id}/publish`, { publishedAt: p.publishedAt });
}

// ── Resources ────────────────────────────────────────────────────────────────

console.log('Resources…');
const termId = new Map<string, string>();
for (const e of ofType('resources').sort((a, b) => Date.parse(a.sys.createdAt) - Date.parse(b.sys.createdAt))) {
	const f = e.fields;
	const { item } = await api('POST', '/content/resources', {
		data: {
			title: f.title.trim(),
			description: f.description,
			url: f.link,
			thumbnail: await image(f.thumbnail?.sys.id, ''), // decorative: the title sits next to it
			featured: f.featured ?? false,
		},
		status: 'draft',
		createdAt: iso(e.sys.createdAt),
	});
	const termIds: string[] = [];
	for (const tag of f.tags ?? []) {
		const slug = slugify(tag);
		if (!termId.has(slug)) {
			const label = tag.trim().charAt(0).toUpperCase() + tag.trim().slice(1);
			termId.set(slug, (await api('POST', '/taxonomies/tag/terms', { slug, label })).term.id);
		}
		termIds.push(termId.get(slug)!);
	}
	if (termIds.length) await api('POST', `/content/resources/${item.id}/terms/tag`, { termIds });
	await api('POST', `/content/resources/${item.id}/publish`, { publishedAt: iso(e.sys.createdAt) });
}
toReview.push(`Resource topics migrated as-is (${[...termId.keys()].join(', ')}); merge or rename them under Topics.`);

// ── GOLD judges, poets and poems → gold_contributors ─────────────────────────

console.log('GOLD contributors…');
const THEMES: Record<string, string> = { 'time&legacy': 'Time & legacy', 'place&belonging': 'Place & belonging', 'self&identity': 'Self & identity' };
const poemsByAuthor = Map.groupBy(ofType('selfIdentityPoems'), (p) => p.fields.author.trim().toLowerCase());
const poemBlock = (title: string, p?: Json) => ({
	_type: 'poem',
	title,
	...(p && { theme: THEMES[p.fields.collection], text: portableText(p.fields.poem), centered: p.fields.centeredText ?? false }),
});

async function contributor(e: Json | undefined, data: Json, publish: boolean) {
	const { item } = await api('POST', '/content/gold_contributors', {
		data,
		status: 'draft',
		...(e && { createdAt: iso(e.sys.createdAt) }),
	});
	if (publish) await api('POST', `/content/gold_contributors/${item.id}/publish`, { publishedAt: iso(e.sys.createdAt) });
}

for (const e of ofType('goldJudges')) {
	const f = e.fields;
	await contributor(e, { role: 'judge', name: f.name, photo: await image(f.photo?.sys.id, `Portrait of ${f.name}`), bio: f.description, sort_order: f.order }, true);
}

for (const e of ofType('goldPoets')) {
	const f = e.fields;
	const theirs = poemsByAuthor.get(f.name.trim().toLowerCase()) ?? [];
	poemsByAuthor.delete(f.name.trim().toLowerCase());
	const titles: string[] = f.poemTitle.split('|').map((t: string) => t.trim()).filter(Boolean);
	const poems = titles.map((t) => poemBlock(t, theirs.find((p) => p.fields.title.trim().toLowerCase() === t.toLowerCase())));
	for (const p of theirs) if (!titles.some((t) => t.toLowerCase() === p.fields.title.trim().toLowerCase())) poems.push(poemBlock(p.fields.title.trim(), p));
	const links = Object.entries((f.socialMediaLinks ?? {}) as Record<string, string>).map(([label, url]) => ({
		label: label.charAt(0).toUpperCase() + label.slice(1),
		url: label.toLowerCase() === 'email' && !url.startsWith('mailto:') ? `mailto:${url}` : url,
	}));
	await contributor(e, {
		role: 'poet',
		name: f.name.trim(),
		photo: await image(f.photo?.sys.id, `Portrait of ${f.name.trim()}`),
		bio: f.description,
		age: theirs[0]?.fields.age,
		location: theirs[0] && titleCasePlace(theirs[0].fields.location),
		poems,
		links,
	}, true);
}

// Poem authors with no poet profile: kept as drafts until someone adds a photo and bio.
for (const [, poems] of poemsByAuthor) {
	const p0 = poems[0].fields;
	const name = titleCase(p0.author.trim());
	await contributor(undefined, {
		role: 'poet', name, age: p0.age, location: titleCasePlace(p0.location),
		poems: poems.map((p) => poemBlock(p.fields.title.trim(), p)),
	}, false);
	toReview.push(`Poet "${name}" is a draft: Contentful had their poem but no profile. Add a photo and bio, then publish.`);
}

// ── Announcement ─────────────────────────────────────────────────────────────

console.log('Announcement…');
for (const e of ofType('alertBanner')) {
	const f = e.fields;
	const { item } = await api('POST', '/content/announcements', {
		data: { message: f.message, link: f.link, link_text: f.linkText },
		status: 'draft',
		createdAt: iso(e.sys.createdAt),
	});
	if (f.active) await api('POST', `/content/announcements/${item.id}/publish`, { publishedAt: iso(e.sys.updatedAt) });
}

// ── Galleries (were Contentful asset tags; order was encoded as "Title | 3") ─

console.log('Galleries…');
const GALLERIES: [tag: string, slug: string, title: string][] = [
	['aboutCollage', 'about-collage', 'About: collage'],
	['aboutFeature', 'about-feature', 'About: feature photos'],
	['aboutBottom', 'about-bottom', 'About: closing photo'],
	['goldCover', 'gold-cover', 'GOLD: anthology cover'],
	['masGallery', 'mas-gallery', 'My Aging Story: exhibit'],
];
for (const [tag, slug, title] of GALLERIES) {
	const tagged = assetList
		.filter((a) => a.metadata.tags.some((t: Json) => t.sys.id === tag))
		.sort((a, b) => (Number(a.fields.title.split('|')[1]) || 1e9) - (Number(b.fields.title.split('|')[1]) || 1e9));
	const items: Json[] = [];
	for (const a of tagged) {
		const label = a.fields.title.split('|')[0].trim();
		if (a.fields.file.contentType.startsWith('video/')) {
			const video = await uploadBytes(`https:${a.fields.file.url}`, a.fields.file.fileName, a.fields.file.contentType);
			// The old site stored each video's poster as a YouTube thumbnail URL in the asset description.
			const poster = await uploadBytes(a.fields.description, `${slugify(label)}-poster.jpg`, undefined, '');
			items.push({ _type: 'video', video: fileValue(video), poster: imageValue(poster), caption: label });
		} else {
			const alt = a.fields.description?.trim() || label;
			items.push({ _type: 'photo', image: await image(a.sys.id, alt) });
			toReview.push(`Gallery ${slug}: check alt text "${alt}" (from Contentful "${a.fields.title}").`);
		}
	}
	const { item } = await api('POST', '/content/galleries', { data: { title, items }, slug, status: 'draft' });
	await api('POST', `/content/galleries/${item.id}/publish`, {});
}

console.log(`\nDone. Uploaded ${uploaded.size} images.\n\nReview in the admin:\n- ${toReview.join('\n- ')}`);
