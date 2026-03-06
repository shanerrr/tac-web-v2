import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import StoriesFeed from "@tac/components/StoriesFeed";
import { getStories } from "@tac/lib/contentful";

export const revalidate = 3600;

export default async function Stories() {
  const stories = await getStories();

  return (
    <div className="min-h-dvh w-full">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-secondary/60"
        scrollThreshold={200}
      />
      <PageHero
        accentLabel="Storytelling"
        title="Stories"
        subtitle={
          <>
            Read stories about aging from <br /> people across the lifespan
          </>
        }
        bgClass="bg-secondary"
      />
      <StoriesFeed stories={stories} />
    </div>
  );
}
