export type Story = {
  id: string;
  name: string;
  age: number;
  decade: string;
  published: string;
  location: string;
  quote: string;
  pronoun: string;
  slug: string;
  portrait: string;
};

export type Film = {
  id: string;
  title: string;
  name: string;
  age: number;
  date: string;
  location: string;
  duration: string;
  slug: string;
  thumbnail: string | null;
};
