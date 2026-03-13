import { formatDate } from "@tac/lib/utils";
import type { Film, GoldJudge, GoldPoet, Story } from "@tac/types";
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
    name: EntryFieldTypes.Text;
    age: EntryFieldTypes.Integer;
    published: EntryFieldTypes.Text;
    location: EntryFieldTypes.Text;
    quote: EntryFieldTypes.Text;
    pronoun: EntryFieldTypes.Text;
    portrait: EntryFieldTypes.AssetLink;
    body: EntryFieldTypes.RichText;
  };
}

interface FilmSkeleton extends EntrySkeletonType {
  contentTypeId: "films";
  fields: {
    title: EntryFieldTypes.Text;
    name: EntryFieldTypes.Text;
    age: EntryFieldTypes.Integer;
    date: EntryFieldTypes.Text;
    location: EntryFieldTypes.Text;
    duration: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    banner: EntryFieldTypes.AssetLink;
    youtubeUrl: EntryFieldTypes.Text;
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
  return items.map((item) => {
    const f = item.fields;
    const portrait = f.portrait as Asset;
    return {
      id: item.sys.id,
      name: f.name,
      age: f.age,
      decade: String(Math.floor(f.age / 10) * 10),
      published: f.published,
      location: f.location,
      quote: f.quote,
      pronoun: f.pronoun,
      slug: item.sys.id,
      portrait: `https:${portrait.fields.file?.url}`,
      body: f.body ?? null,
    };
  });
};

export type MediaAsset = {
  url: string;
  type: "video" | "quote";
  title: string;
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

  return items.map((item) => {
    const f = item.fields;
    const banner = f.banner as Asset | undefined;
    const bannerUrl = banner?.fields.file?.url;
    return {
      id: item.sys.id,
      title: f.title,
      name: f.name,
      age: f.age,
      date: formatDate(f.date ?? item.sys.createdAt),
      location: f.location,
      duration: f.duration,
      slug: f.slug ?? item.sys.id,
      banner: bannerUrl ? `https:${bannerUrl}` : null,
      youtubeUrl: f.youtubeUrl,
    };
  });
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
