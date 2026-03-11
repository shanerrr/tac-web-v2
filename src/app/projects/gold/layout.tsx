import Footer from "@tac/components/Footer";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "GOLD",
  description:
    "A poetry collection celebrating older adults' stories across Canada — weaving personal narratives into poems that honour resilience, wisdom, and the golden threads of a life well-lived.",
  openGraph: {
    title: "GOLD | The Age Collective",
    description:
      "Poems celebrating the golden threads of a life well-lived, drawn from conversations with older adults across Canada.",
  },
};

export default function GoldLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColor="bg-[#0A0A0A]" textureClass="" />
    </main>
  );
}
