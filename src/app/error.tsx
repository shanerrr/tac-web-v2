"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="mb-4 font-sans text-primary text-xs uppercase tracking-[0.4em]">
        Something went wrong
      </p>
      <h1 className="font-serif text-5xl text-foreground leading-tight md:text-7xl">
        Oops
      </h1>
      <p className="mt-4 max-w-md font-sans text-foreground/60 text-lg leading-relaxed">
        We hit an unexpected error. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center gap-3 rounded-xl border border-primary bg-primary px-8 py-4 font-sans text-sm text-white uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      >
        Try Again
      </button>
    </div>
  );
}
