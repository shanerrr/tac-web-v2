import Navbar from "@tac/components/Navbar";
import StoriesFeed from "@tac/components/StoriesFeed";
import WaveDivider from "@tac/components/WaveDivider";

export default function Stories() {
  return (
    <div className="min-h-dvh w-screen">
      <div className="bg-secondary">
        <Navbar textColour="text-white" />
        <section className="flex h-[50vh] flex-col items-center justify-center text-center text-white">
          <h1 className="font-bold font-serif text-7xl sm:text-8xl lg:text-9xl">
            Stories
          </h1>
          <p className="mt-4 font-light font-sans text-lg sm:text-5xl">
            Read stories about aging from <br />
            people across the lifespan.
          </p>
        </section>
        <WaveDivider />
      </div>
      <StoriesFeed />
    </div>
  );
}
