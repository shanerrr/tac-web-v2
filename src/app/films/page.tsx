import FilmsFeed from "@tac/components/FilmsFeed";
import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import { getFilms } from "@tac/lib/contentful";

export default async function Films() {
  const films = await getFilms();

  return (
    <div className="min-h-dvh w-full">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-primary/60"
        scrollThreshold={200}
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
        glowOverlay="radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 55%)"
        vignetteOverlay="radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)"
        fullHeight
      />
      <FilmsFeed films={films} />
    </div>
  );
}
