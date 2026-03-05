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
    thumbnail: EntryFieldTypes.AssetLink;
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      published: formatDate(f.published),
      location: f.location,
      quote: f.quote,
      pronoun: f.pronoun,
      slug: item.sys.id,
      portrait: `https:${portrait.fields.file?.url}`,
    };
  });
}

export async function getFilms(): Promise<Film[]> {
  const { items } = await client.getEntries<FilmSkeleton>({
    content_type: "films",
    order: ["-sys.createdAt"],
  });

  return items.map((item) => {
    const f = item.fields;
    const thumb = f.thumbnail as Asset | undefined;
    const thumbnailUrl = thumb?.fields.file?.url;

    return {
      id: item.sys.id,
      title: f.title,
      name: f.name,
      age: f.age,
      date: formatDate(f.date ?? item.sys.createdAt),
      location: f.location,
      duration: f.duration,
      slug: f.slug ?? item.sys.id,
      thumbnail: thumbnailUrl ? `https:${thumbnailUrl}` : null,
    };
  });
}
