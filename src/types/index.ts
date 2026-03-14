import type { Document } from "@contentful/rich-text-types";

export type Story = {
  _type?: "story";
  id: string;
  show?: boolean;
  name: string;
  age: number;
  decade: string;
  published: string;
  location: string;
  quote: string;
  pronoun: string;
  slug: string;
  related: Array<Story | Film>;
  portrait: string;
  body: Document | null;
};

export type Film = {
  _type?: "film";
  id: string;
  title: string;
  name: string;
  age: number;
  date: string;
  location: string;
  duration: string;
  slug: string;
  banner: string | null;
  youtubeUrl?: string | null;
};

export function isFilm(item: Story | Film): item is Film {
  return item._type === "film";
}

export function isStory(item: Story | Film): item is Story {
  return !isFilm(item);
}

export type AlertBanner = {
  id: string;
  message: string;
  link: string | null;
  linkText: string | null;
};

export type GoldJudge = {
  id: string;
  name: string;
  photo: string | null;
  description: string;
};

export type GoldPoet = {
  id: string;
  name: string;
  poemTitle: string;
  photo: string | null;
  description: string;
  socialMediaLinks: Record<string, string> | null;
};
