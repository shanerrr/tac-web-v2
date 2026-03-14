import Banner from "@tac/components/Banner/Banner";
import { SITE_URL } from "@tac/lib/constants";
import { getAlertBanner } from "@tac/lib/contentful";
import { Analytics } from "@vercel/analytics/next";
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
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const banner = await getAlertBanner();

  return (
    <html lang="en-CA">
      <body
        className={`${oldStandardTT.variable} ${inter.variable} font-sans antialiased`}
      >
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[100] -translate-y-20 rounded-lg bg-foreground px-4 py-2 font-sans text-sm text-white shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        {banner && <Banner banner={banner} />}
        <main id="main-content">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
