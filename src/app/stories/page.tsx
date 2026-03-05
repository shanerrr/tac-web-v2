import Navbar from "@tac/components/Navbar";
import StoriesFeed from "@tac/components/StoriesFeed";
import WaveDivider from "@tac/components/WaveDivider";

function RingAccent() {
  return (
    <svg
      viewBox="80.7 154.9 85.8 84.2"
      fill="none"
      aria-hidden="true"
      className="h-8 w-8 shrink-0 opacity-80"
    >
      <path
        d="M154.159 179.362C163.477 195.502 157.436 216.554 140.489 226.338C123.543 236.122 102.291 230.827 92.9731 214.688C83.6551 198.548 89.6954 177.496 106.642 167.712C123.588 157.928 144.841 163.223 154.159 179.362Z"
        stroke="white"
        strokeWidth="3"
      />
      <path
        d="M147.545 183.18C155.558 197.058 151.177 214.479 137.92 222.133C124.662 229.787 107.385 224.872 99.3717 210.993C91.3591 197.114 95.7409 179.694 108.998 172.04C122.256 164.386 139.532 169.301 147.545 183.18Z"
        stroke="white"
        strokeWidth="3"
      />
      <path
        d="M141.697 186.842C146.522 195.2 142.691 206.863 132.501 212.747C122.31 218.63 110.295 216.115 105.47 207.758C100.645 199.4 104.474 187.737 114.664 181.853C124.855 175.97 136.871 178.485 141.697 186.842Z"
        stroke="white"
        strokeWidth="3"
      />
      <path
        d="M130.952 196.316C132.513 199.019 131.446 202.831 128.156 204.731C124.867 206.63 121.032 205.648 119.471 202.945C117.91 200.241 118.977 196.429 122.267 194.53C125.557 192.63 129.392 193.612 130.952 196.316Z"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function Stories() {
  return (
    <div className="min-h-dvh w-screen">
      <Navbar transparent textColour="text-white" scrollThreshold={500} />
      {/* Negative margin pulls the hero up under the transparent sticky nav */}
      <div className="-mt-27 md:-mt-32 bg-secondary heroTexture">
        <section className="relative flex h-[70vh] pb-27 md:pb-32 flex-col items-center justify-center overflow-hidden pt-27 text-center text-white md:pt-32">
          {/* Title */}
          <h1 className="my-6 font-bold font-serif text-8xl leading-none tracking-tight sm:text-9xl lg:text-[11rem]">
            Stories
          </h1>

          {/* Subtitle */}
          <p className="mt-6 font-light font-sans text-2xl sm:text-4xl">
            Read stories about aging from <br /> people across the lifespan
          </p>
        </section>
      </div>
      <StoriesFeed />
    </div>
  );
}
