import { formatDate } from "@tac/lib/utils";
import type { Film, GoldJudge, GoldPoet, Story } from "@tac/types";
import type { Asset, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
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

export async function getStories(): Promise<Story[]> {
  const { items } = await client.getEntries<StorySkeleton>({
    content_type: "stories",
    order: ["-sys.createdAt"],
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
}

export type MediaAsset = {
  url: string;
  type: "video" | "quote";
  title: string;
  sortIndex: number;
};

export async function getAssetsByTag(tag: string): Promise<MediaAsset[]> {
  const { items } = await client.getAssets({
    "metadata.tags.sys.id[in]": [tag],
  });

  return items
    .map((asset) => {
      const url = asset.fields.file?.url;
      const contentType = asset.fields.file?.contentType ?? "";
      if (!url) return null;
      const sortIndex =
        Number(asset.fields.title?.split("|")[1]) || Number.MAX_SAFE_INTEGER;
      return {
        url: `https:${url}`,
        type: (contentType.startsWith("video/")
          ? "video"
          : "image") as MediaAsset["type"],
        title: asset.fields.title ?? "",
        sortIndex,
      };
    })
    .filter((a): a is MediaAsset => a !== null);
}

export async function getFilms(): Promise<Film[]> {
  const { items } = await client.getEntries<FilmSkeleton>({
    content_type: "films",
    order: ["-sys.createdAt"],
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
}

export async function getGoldJudes(): Promise<GoldJudge[]> {
  const { items } = await client.getEntries<GoldJudgesSkeleton>({
    content_type: "goldJudges",
    order: ["-sys.createdAt"],
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
}

export async function getGoldPoets(): Promise<GoldPoet[]> {
  const { items } = await client.getEntries<GoldPoetsSkeleton>({
    content_type: "goldPoets",
    order: ["-sys.createdAt"],
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
}
