import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Films",
  description:
    "Watch short films about aging told by real voices — intimate portraits of people sharing their experiences across the lifespan.",
  openGraph: {
    title: "Films | The Age Collective",
    description: "Watch short films about aging told by real voices.",
  },
};

export default function FilmsLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColor="bg-primary" />
    </main>
  );
}
