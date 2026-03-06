import Navbar from "@tac/components/Navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <p className="mb-4 font-sans text-primary text-xs uppercase tracking-[0.4em]">
          Page not found
        </p>
        <h1 className="font-serif text-5xl text-foreground leading-tight md:text-7xl">
          404
        </h1>
        <p className="mt-4 max-w-md font-sans text-foreground/60 text-lg leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 rounded-xl border border-primary bg-primary px-8 py-4 font-sans text-sm text-white uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
        >
          Go Home
        </Link>
      </main>
    </div>
  );
}
