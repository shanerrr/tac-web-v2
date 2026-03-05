import type { Metadata, Viewport } from "next";
import { Inter, Old_Standard_TT } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const oldStandardTT = Old_Standard_TT({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-old-standard-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
});

export const metadata: Metadata = {
  title: "The Age Collective",
  description: "We are all aging. Let's talk about it",
};

export const viewport: Viewport = {
  // Matches the site's warm cream background — sets the mobile browser chrome colour
  themeColor: "#FCF2E0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oldStandardTT.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
