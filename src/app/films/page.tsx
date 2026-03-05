import FilmsFeed from "@tac/components/FilmsFeed";
import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";

export default function Films() {
  return (
    <div className="min-h-dvh w-screen">
      <Navbar
        transparent
        textColour="text-white"
        burgerBgColour="bg-primary/60"
        scrollThreshold={500}
      />
      <PageHero
        accentLabel="Storytelling"
        title="Films"
        subtitle={
          <>
            Short films about aging, told by <br /> people across the lifespan
          </>
        }
        bgClass="bg-primary"
        watermarkRight="calc(min(110vw, 110vh) / 2)"
      />
      <FilmsFeed />
    </div>
  );
}
