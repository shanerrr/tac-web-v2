import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Read personal stories about aging from people across the lifespan — honest reflections on growing older, identity, and connection.",
  openGraph: {
    title: "Stories | The Age Collective",
    description:
      "Read personal stories about aging from people across the lifespan.",
  },
};

export default function StoriesLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColor="bg-secondary" />
    </main>
  );
}
