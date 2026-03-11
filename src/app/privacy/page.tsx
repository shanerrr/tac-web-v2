import Footer from "@tac/components/Footer";
import Navbar from "@tac/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Age Collective",
  description:
    "How The Age Collective collects, uses, and safeguards your personal information.",
};

const sections = [
  {
    title: "1. Who We Are",
    content: (
      <p>
        The Age Collective (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;) is a storytelling and knowledge mobilization
        initiative dedicated to challenging ageism and amplifying diverse
        experiences of aging. This Privacy Policy explains how we collect, use,
        disclose, and safeguard personal information through the website
        theagecollective.com (the &ldquo;Site&rdquo;).
      </p>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        <h4 className="mb-3 font-medium font-sans text-foreground text-sm uppercase tracking-[0.15em]">
          a. Information You Provide Directly
        </h4>
        <ul className="mb-6 list-disc space-y-1 pl-5 text-foreground/70">
          <li>Name</li>
          <li>Age</li>
          <li>Location</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Biographical information</li>
          <li>Story submissions, interviews, poetry, or creative work</li>
          <li>Photographs or multimedia content</li>
          <li>Social media handles (if voluntarily provided)</li>
        </ul>
        <h4 className="mb-3 font-medium font-sans text-foreground text-sm uppercase tracking-[0.15em]">
          b. Automatically Collected Information
        </h4>
        <p className="mb-3 text-foreground/70">
          When you visit our Site, we may collect:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/70">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Pages visited</li>
          <li>Date and time of visit</li>
          <li>Referring website</li>
        </ul>
        <p className="text-foreground/70">
          This information is collected through cookies or analytics tools.
        </p>
      </>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          We use personal information to:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/70">
          <li>
            Publish and promote submitted stories, poetry, and creative works
            with consent from the original author
          </li>
          <li>Improve our website and programming</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p className="text-foreground/70">
          We do not sell or rent personal information.
        </p>
      </>
    ),
  },
  {
    title: "4. Consent",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          By submitting content or personal information to us, you consent to
          its collection, use, and publication as described in this policy.
        </p>
        <p className="text-foreground/70">
          You may withdraw consent at any time by contacting us at{" "}
          <a
            href="mailto:info@theagecollective.com"
            className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground/60"
          >
            info@theagecollective.com
          </a>
          . Withdrawal may limit our ability to feature your content.
        </p>
      </>
    ),
  },
  {
    title: "5. Publication of Stories and Creative Work",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          If you submit stories, poetry, images, or other creative content:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-foreground/70">
          <li>
            You grant The Age Collective a non-exclusive, royalty-free,
            worldwide license to publish, display, reproduce, and promote your
            work with credit on our website, social media platforms, digital
            exhibitions, and related materials.
          </li>
          <li>
            You retain ownership of your original work unless otherwise agreed
            in writing.
          </li>
          <li>
            You confirm that the content is your own or that you have permission
            to share it.
          </li>
          <li>
            You confirm that individuals depicted in the materials you share
            with us have consented to publication.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Cookies and Analytics",
    content: (
      <p>
        We may use cookies and third-party analytics services (e.g., Google
        Analytics) to understand how visitors use our Site. You may disable
        cookies in your browser settings.
      </p>
    ),
  },
  {
    title: "7. Third-Party Links",
    content: (
      <p>
        Our Site contains links to external websites. We are not responsible for
        the content, privacy practices, or policies of those sites.
      </p>
    ),
  },
  {
    title: "8. Data Storage and Security",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          We take reasonable administrative, technical, and physical safeguards
          to protect personal information.
        </p>
        <p className="text-foreground/70">
          However, no online transmission is completely secure. Use of the Site
          is at your own risk.
        </p>
      </>
    ),
  },
  {
    title: "9. Access and Correction",
    content: (
      <p>
        You may request access to personal information we hold about you and
        request corrections. Contact:{" "}
        <a
          href="mailto:info@theagecollective.com"
          className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground/60"
        >
          info@theagecollective.com
        </a>
      </p>
    ),
  },
  {
    title: "10. Children\u2019s Privacy",
    content: (
      <p>
        We do not knowingly collect personal information from individuals under
        13 without parental consent.
      </p>
    ),
  },
  {
    title: "11. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy periodically. Updates will be posted
        on this page with a revised effective date.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-dvh w-full">
      <Navbar />

      <main className="container pt-40 pb-24 md:pt-48">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <p className="mb-4 font-sans text-foreground/40 text-xs uppercase tracking-[0.4em]">
            Legal
          </p>
          <h1 className="font-serif text-4xl text-foreground leading-tight md:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <div className="mt-3 h-px w-16 bg-foreground/15" />
          <p className="mt-4 font-sans text-foreground/40 text-sm">
            Effective Date: March 10, 2026
          </p>

          {/* Sections */}
          <div className="mt-16 space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 font-serif text-foreground text-xl md:text-2xl">
                  {section.title}
                </h3>
                <div className="font-sans text-base text-foreground/70 leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Contact footer */}
          <div className="mt-20 rounded-2xl border border-foreground/10 bg-foreground/2 px-8 py-8">
            <p className="font-sans text-foreground/50 text-sm">
              Questions about this Privacy Policy? Contact us at{" "}
              <a
                href="mailto:info@theagecollective.com"
                className="text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:decoration-foreground/60"
              >
                info@theagecollective.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer bgColor="bg-[#0A0A0A]" textureClass="" />
    </div>
  );
}
