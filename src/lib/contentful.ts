import { formatDate } from "@tac/lib/utils";
import type {
  AlertBanner,
  Film,
  GoldJudge,
  GoldPoet,
  Resource,
  Story,
} from "@tac/types";
import type { Asset, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { createClient } from "contentful";
import { cacheTag } from "next/cache";

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN environment variables",
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

interface StorySkeleton extends EntrySkeletonType {
  contentTypeId: "stories";
  fields: {
    show: EntryFieldTypes.Boolean;
    name: EntryFieldTypes.Text;
    age: EntryFieldTypes.Integer;
    published: EntryFieldTypes.Text;
    location: EntryFieldTypes.Text;
    quote: EntryFieldTypes.Text;
    pronoun: EntryFieldTypes.Text;
    portrait: EntryFieldTypes.AssetLink;
    related: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<StorySkeleton | FilmSkeleton>
    >;
    body: EntryFieldTypes.RichText;
  };
}

interface FilmSkeleton extends EntrySkeletonType {
  contentTypeId: "films";
  fields: {
    title: EntryFieldTypes.Text;
    name: EntryFieldTypes.Text;
    age: EntryFieldTypes.Integer;
    published: EntryFieldTypes.Text;
    location: EntryFieldTypes.Text;
    duration: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    banner: EntryFieldTypes.AssetLink;
    youtubeUrl: EntryFieldTypes.Text;
  };
}

interface ResourceSkeleton extends EntrySkeletonType {
  contentTypeId: "resources";
  fields: {
    title: EntryFieldTypes.Text;
    featured: EntryFieldTypes.Boolean;
    description: EntryFieldTypes.Text;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    link: EntryFieldTypes.Text;
    thumbnail: EntryFieldTypes.AssetLink;
  };
}
interface GoldJudgesSkeleton extends EntrySkeletonType {
  contentTypeId: "goldJudges";
  fields: {
    name: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    photo: EntryFieldTypes.AssetLink;
  };
}

interface AlertBannerSkeleton extends EntrySkeletonType {
  contentTypeId: "alertBanner";
  fields: {
    message: EntryFieldTypes.Text;
    link: EntryFieldTypes.Text;
    linkText: EntryFieldTypes.Text;
    active: EntryFieldTypes.Boolean;
  };
}

interface GoldPoetsSkeleton extends EntrySkeletonType {
  contentTypeId: "goldPoets";
  fields: {
    name: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    photo: EntryFieldTypes.AssetLink;
    poemTitle: EntryFieldTypes.Text;
    socialMediaLinks: EntryFieldTypes.Object;
  };
}

export const getStories = async (): Promise<Story[]> => {
  "use cache";
  cacheTag("stories");

  const { items } = await client.getEntries<StorySkeleton>({
    content_type: "stories",
    order: ["-sys.createdAt"],
    include: 1,
  });
  // biome-ignore lint/suspicious/noExplicitAny: contentful resolved entries have varying shapes
  const mapRelated = (entry: any): Story | Film | null => {
    if (!entry || !("fields" in entry) || !("sys" in entry)) return null;
    const contentType = entry.sys.contentType?.sys?.id;

    if (contentType === "films") {
      const f = entry.fields;
      const banner = f.banner as Asset | undefined;
      const bannerUrl = banner?.fields.file?.url;
      return {
        _type: "film" as const,
        id: entry.sys.id,
        title: f.title,
        name: f.name,
        age: f.age,
        date: formatDate(f.date ?? entry.sys.createdAt),
        location: f.location,
        duration: f.duration,
        slug: f.slug ?? entry.sys.id,
        banner: bannerUrl ? `https:${bannerUrl}` : null,
        youtubeUrl: f.youtubeUrl,
      } as Film;
    }

    return mapStory(entry);
  };

  const mapStory = (item: (typeof items)[number]): Story => {
    const f = item.fields;
    const portrait = f.portrait as Asset;
    const linked = (f.related ?? [])
      .map(mapRelated)
      .filter((r): r is Story | Film => r !== null);
    return {
      _type: "story" as const,
      id: item.sys.id,
      show: f.show,
      name: f.name,
      age: f.age,
      decade: String(Math.floor(f.age / 10) * 10),
      published: f.published,
      location: f.location,
      quote: f.quote,
      pronoun: f.pronoun,
      slug: item.sys.id,
      portrait: `https:${portrait.fields.file?.url}`,
      related: linked,
      body: f.body ?? null,
    };
  };

  return items.flatMap((item) => {
    if (!item.fields.show) return [];
    return [mapStory(item)];
  });
};

export type MediaAsset = {
  url: string;
  type: "video" | "quote";
  title: string;
  description?: string;
  sortIndex: number;
};

export const getAssetsByTag = async (tag: string): Promise<MediaAsset[]> => {
  "use cache";
  cacheTag(tag);

  const { items } = await client.getAssets({
    "metadata.tags.sys.id[in]": [tag],
  });

  return items
    .map((asset) => {
      const url = asset.fields.file?.url;
      if (!url) return null;
      const sortIndex =
        Number(asset.fields.title?.split("|")[1]) || Number.MAX_SAFE_INTEGER;
      return {
        url: `https:${url}`,
        type: "video" as MediaAsset["type"],
        title: asset.fields.title ?? "",
        description: asset.fields.description,
        sortIndex,
      };
    })
    .filter((a) => a !== null);
};

export const getFilms = async (): Promise<Film[]> => {
  "use cache";
  cacheTag("films");

  const { items } = await client.getEntries<FilmSkeleton>({
    content_type: "films",
    order: ["-sys.createdAt"],
    include: 1,
  });

  return items
    .map((item) => {
      const f = item.fields;
      const banner = f.banner as Asset | undefined;
      const bannerUrl = banner?.fields.file?.url;
      const rawDate = f.published ?? item.sys.createdAt;
      return {
        _sortDate: new Date(rawDate).getTime(),
        id: item.sys.id,
        title: f.title,
        name: f.name,
        age: f.age,
        published: formatDate(rawDate),
        location: f.location,
        duration: f.duration,
        slug: f.slug ?? item.sys.id,
        banner: bannerUrl ? `https:${bannerUrl}` : null,
        youtubeUrl: f.youtubeUrl,
      };
    })
    .sort((a, b) => b._sortDate - a._sortDate)
    .map(({ _sortDate: _, ...film }) => film);
};

export const getGoldJudges = async (): Promise<GoldJudge[]> => {
  "use cache";
  cacheTag("goldJudges");

  const { items } = await client.getEntries<GoldJudgesSkeleton>({
    content_type: "goldJudges",
    order: ["-sys.createdAt"],
    include: 1,
  });

  return items.map((item) => {
    const f = item.fields;
    const photo = f.photo as Asset | undefined;
    const photoUrl = photo?.fields.file?.url;

    return {
      id: item.sys.id,
      name: f.name,
      description: f.description,
      photo: photo ? `https:${photoUrl}` : null,
    };
  });
};

export const getResources = async (): Promise<Resource[]> => {
  "use cache";
  cacheTag("resources");

  const { items } = await client.getEntries<ResourceSkeleton>({
    content_type: "resources",
    order: ["-sys.createdAt"],
    include: 1,
  });

  return items.map((item) => {
    const f = item.fields;
    const thumbnail = f.thumbnail as Asset | undefined;
    return {
      id: item.sys.id,
      featured: f.featured,
      title: f.title,
      description: f.description,
      thumbnail: `https:${thumbnail?.fields.file?.url}`,
      tags: f.tags as string[],
      link: f.link,
    };
  });
};
export const getGoldPoets = async (): Promise<GoldPoet[]> => {
  "use cache";
  cacheTag("goldPoets");

  const { items } = await client.getEntries<GoldPoetsSkeleton>({
    content_type: "goldPoets",
    order: ["-sys.createdAt"],
    include: 1,
  });

  return items
    .map((item) => {
      const f = item.fields;
      const photo = f.photo as Asset | undefined;
      const photoUrl = photo?.fields.file?.url;

      return {
        id: item.sys.id,
        name: f.name,
        poemTitle: f.poemTitle,
        description: f.description,
        photo: photo ? `https:${photoUrl}` : null,
        socialMediaLinks:
          (f.socialMediaLinks as GoldPoet["socialMediaLinks"]) ?? null,
      };
    })
    .sort((a, b) => {
      const lastA = a.name.split(" ").at(-1) ?? "";
      const lastB = b.name.split(" ").at(-1) ?? "";
      return lastA.localeCompare(lastB);
    });
};

export const getAlertBanner = async (): Promise<AlertBanner | null> => {
  "use cache";
  cacheTag("alertBanner");

  const { items } = await client.getEntries<AlertBannerSkeleton>({
    content_type: "alertBanner",
    limit: 1,
    order: ["-sys.updatedAt"],
  });

  const entry = items.find((item) => item.fields.active);
  if (!entry) return null;

  return {
    id: entry.sys.id,
    message: entry.fields.message,
    link: entry.fields.link ?? null,
    linkText: entry.fields.linkText ?? null,
  };
};
