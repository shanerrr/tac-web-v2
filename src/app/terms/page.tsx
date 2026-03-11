import Footer from "@tac/components/Footer";
import Navbar from "@tac/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | The Age Collective",
  description: "Terms and conditions for using The Age Collective website.",
};

const sections = [
  {
    title: "1. Use of This Website",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          This website is intended for informational, educational, and community
          purposes. You agree to use it respectfully and not for unlawful or
          harmful activities.
        </p>
        <p className="mb-3 text-foreground/70">You may not:</p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/70">
          <li>
            Reproduce, republish, or redistribute content without permission
          </li>
          <li>Use content for commercial purposes without written consent</li>
          <li>Misrepresent our work or contributors</li>
        </ul>
        <p className="text-foreground/70">
          If you do not agree, please do not use the Site.
        </p>
      </>
    ),
  },
  {
    title: "2. Intellectual Property",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          All content on the Site &mdash; including text, design, graphics,
          logos, and compilations &mdash; is the property of The Age Collective
          or its contributors and is protected by copyright law.
        </p>
        <p className="mb-2 font-medium font-sans text-foreground text-sm">
          You may:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/70">
          <li>
            View and share content for personal, non-commercial purposes with
            proper attribution.
          </li>
        </ul>
        <p className="mb-2 font-medium font-sans text-foreground text-sm">
          You may not:
        </p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/70">
          <li>
            Reproduce, modify, distribute, or commercially exploit content
            without written permission.
          </li>
        </ul>
        <p className="text-foreground/70">
          Poems and creative works remain the intellectual property of their
          respective authors. They are shared here with permission. You may not
          copy, reproduce, publish, or distribute poems or creative content
          without written consent from both The Age Collective and the author.
          If you wish to share or cite work, please contact us.
        </p>
      </>
    ),
  },
  {
    title: "3. Contributor Submissions",
    content: (
      <>
        <p className="mb-3 text-foreground/70">By submitting content, you:</p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/70">
          <li>Confirm you own the rights to the content</li>
          <li>
            Grant us the publishing license outlined in the Privacy Policy
          </li>
          <li>
            Agree that content must not be defamatory, discriminatory, unlawful,
            or infringe on the rights of others
          </li>
        </ul>
        <p className="text-foreground/70">
          We reserve the right to edit, remove, or decline submissions.
        </p>
      </>
    ),
  },
  {
    title: "4. Community Standards",
    content: (
      <>
        <p className="mb-3 text-foreground/70">Users agree not to:</p>
        <ul className="mb-4 list-disc space-y-1 pl-5 text-foreground/70">
          <li>Post abusive, discriminatory, or harmful content</li>
          <li>Harass other users</li>
          <li>Attempt to interfere with website functionality</li>
          <li>Upload malicious code</li>
        </ul>
        <p className="text-foreground/70">
          We may remove content or restrict access for violations.
        </p>
      </>
    ),
  },
  {
    title: "5. Disclaimer",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          The content on this Site is provided for informational and educational
          purposes only. While we strive for accuracy, we do not guarantee
          completeness or reliability.
        </p>
        <p className="text-foreground/70">
          Content reflects the views of individual contributors and does not
          necessarily represent the views of The Age Collective.
        </p>
      </>
    ),
  },
  {
    title: "6. Limitation of Liability",
    content: (
      <>
        <p className="mb-3 text-foreground/70">
          To the fullest extent permitted by law, The Age Collective shall not
          be liable for:
        </p>
        <ul className="list-disc space-y-1 pl-5 text-foreground/70">
          <li>Any indirect or consequential damages</li>
          <li>Loss of data</li>
          <li>Website interruptions</li>
          <li>Reliance on published content</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless The Age Collective from claims
        arising from your submitted content or misuse of the Site.
      </p>
    ),
  },
  {
    title: "8. Governing Law",
    content: (
      <p>These Terms are governed by the laws of Canada applicable therein.</p>
    ),
  },
];

export default function TermsOfUse() {
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
            Terms of Use
          </h1>
          <div className="mt-3 h-px w-16 bg-foreground/15" />
          <p className="mt-4 font-sans text-foreground/40 text-sm">
            Effective Date: March 10, 2026
          </p>
          <p className="mt-6 font-sans text-base text-foreground/70 leading-relaxed">
            Welcome to The Age Collective website. By accessing or using this
            website, you agree to the following terms.
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
              Questions about these Terms? Contact us at{" "}
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
