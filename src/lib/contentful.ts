import type { Film, Story } from "@tac/types";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getStories(): Promise<Story[]> {
  const response = await client.getEntries({
    content_type: "stories",
    order: ["-sys.createdAt"],
  });

  return response.items.map((item) => {
    return {
      ...item.fields,
      id: item.sys.id,
      decade: String(Math.floor(item.fields.age / 10) * 10),
      published: new Date(item.fields.published).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      slug: item.sys.id,
      portrait: `https:${item.fields.portrait.fields.file.url}`,
    };
  });
}

export async function getFilms(): Promise<Film[]> {
  const response = await client.getEntries({
    content_type: "films",
    order: ["-sys.createdAt"],
  });

  return response.items.map((item) => {
    return item.fields;
  });
}
