import { formatDate } from "@tac/lib/utils";
import type { Film, Story } from "@tac/types";
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
  type: "image" | "video";
  title: string;
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
      return {
        url: `https:${url}`,
        type: contentType.startsWith("video/") ? "video" : "image",
        title: asset.fields.title ?? "",
      } satisfies MediaAsset;
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
    return {
      id: item.sys.id,
      title: f.title,
      name: f.name,
      age: f.age,
      date: formatDate(f.date ?? item.sys.createdAt),
      location: f.location,
      duration: f.duration,
      slug: f.slug ?? item.sys.id,
      banner: `https:${banner?.fields.file?.url}`,
      youtubeUrl: f.youtubeUrl,
    };
  });
}
