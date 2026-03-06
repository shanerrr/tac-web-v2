import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Aging Story",
  description:
    "An immersive, travelling exhibit that invites people of all ages to engage with aging through storytelling, reflection, and shared experience.",
  openGraph: {
    title: "My Aging Story | The Age Collective",
    description: "An interactive exhibit exploring personal aging narratives.",
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
      <Footer bgColor="bg-primary" />
    </main>
  );
}
