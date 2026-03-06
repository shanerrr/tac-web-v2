import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Age Collective — a sister-led initiative challenging ageism through storytelling, art, and intergenerational community building.",
  openGraph: {
    title: "About Us | The Age Collective",
    description:
      "Learn about The Age Collective — a sister-led initiative challenging ageism through storytelling, art, and intergenerational community building.",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColor="bg-tertiary" />
    </main>
  );
}
