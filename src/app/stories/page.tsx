import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import StoriesFeed from "@tac/components/StoriesFeed";
import { getStories } from "@tac/lib/contentful";

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
        glowOverlay="radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 55%)"
        vignetteOverlay="radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)"
        fullHeight
      />
      <StoriesFeed stories={stories} />
    </div>
  );
}
