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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theagecollective.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Age Collective",
    template: "%s | The Age Collective",
  },
  description:
    "Challenging ageism through storytelling, film, art, and community. We're all aging — let's talk about it.",
  keywords: [
    "aging",
    "ageism",
    "storytelling",
    "intergenerational",
    "older adults",
    "community",
    "The Age Collective",
  ],
  authors: [{ name: "The Age Collective" }],
  creator: "The Age Collective",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "The Age Collective",
    title: "The Age Collective",
    description:
      "Challenging ageism through storytelling, film, art, and community. We're all aging — let's talk about it.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Age Collective",
    description:
      "Challenging ageism through storytelling, film, art, and community.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
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
