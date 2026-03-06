import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us | The Age Collective",
  description: "We are all aging. Let's talk about it",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColor="bg-tertiary" />
    </main>
  );
}
