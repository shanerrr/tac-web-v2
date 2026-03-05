import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import StoriesFeed from "@tac/components/StoriesFeed";

export default function Stories() {
  return (
    <div className="min-h-dvh w-screen">
      <Navbar
        transparent
        textColour="text-white"
        burgerBgColour="bg-secondary/60"
        scrollThreshold={500}
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
      <StoriesFeed />
    </div>
  );
}
