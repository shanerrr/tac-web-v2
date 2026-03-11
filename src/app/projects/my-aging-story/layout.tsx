import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "My Aging Story",
  description:
    "On February 21–22, 2025 in Edmonton, AB — 22 powerful stories challenging ageism and celebrating resilience through storytelling, reflection, and shared experience.",
  openGraph: {
    title: "My Aging Story | The Age Collective",
    description:
      "An immersive exhibit showcasing 22 stories from Edmontonians of all ages, challenging ageism and sparking conversations about growing older.",
  },
};

export default function MyAgingStoryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main>
      {children}
      <Footer bgColor="bg-quaternary" />
    </main>
  );
}
