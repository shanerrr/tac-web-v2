import Footer from "@tac/components/Footer";
import type { ReactNode } from "react";

export default function StoriesLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColour="bg-secondary" />
    </main>
  );
}
