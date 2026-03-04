import Navbar from "@tac/components/Navbar";
import StoriesFeed from "@tac/components/StoriesFeed";

function WaveDivider() {
  return (
    <svg
      viewBox="0 0 1440 220"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="block w-full"
      aria-hidden="true"
    >
      <path
        d="M0,150 C150,220 350,0 560,110 C720,220 900,0 1040,110 C1160,220 1320,0 1440,110 L1440,220 L0,220 Z"
        fill="white"
      />
    </svg>
  );
}

export default function Stories() {
  return (
    <div className="min-h-dvh w-screen">
      <div className="bg-secondary">
        <Navbar textColour="text-white" />
        <section className="flex h-[50vh] flex-col items-center justify-center py-20 text-center text-white">
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
