import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Learn, connect, and engage around aging and ageism with curated resources from The Age Collective.",
  openGraph: {
    title: "Resources | The Age Collective",
    description:
      "Learn, connect, and engage around aging and ageism with curated resources from The Age Collective.",
  },
};

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColor="bg-primary" />
    </main>
  );
}
