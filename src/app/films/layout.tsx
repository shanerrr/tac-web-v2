import Footer from "@tac/components/Footer";
import type { ReactNode } from "react";

export default function FilmsLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      {children}
      <Footer bgColour="bg-primary" />
    </main>
  );
}
