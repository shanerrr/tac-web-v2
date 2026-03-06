import Footer from "@tac/components/Footer";
import type { ReactNode } from "react";

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
