import {
  EmailIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@tac/components/Icons";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo-rings.svg";

const exploreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Stories", href: "/stories" },
  { label: "Videos", href: "/videos" },
  { label: "Resources", href: "/resources" },
];

const projectLinks = [
  { label: "My Aging Story", href: "/projects/my-aging-story" },
  { label: "GOLD", href: "/projects/gold" },
];

const socialLinks = [
  { label: "Email", href: "mailto:hello@theagecollective.ca", icon: EmailIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-age-collective",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theagecollective",
    icon: InstagramIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TheAgeCollective",
    icon: YouTubeIcon,
  },
];

const LAND_ACKNOWLEDGEMENT =
  "The Age Collective is based on the traditional territories of Indigenous Peoples across Canada. As a project that works with individuals from many regions, we recognize that our community gathers across diverse lands and nations. We acknowledge the enduring presence, knowledge, and sovereignty of First Nations, Inuit, and Métis Peoples, and we are committed to learning how our work can contribute to justice, respect, and accountability.";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container grid grid-cols-2 gap-x-6 gap-y-12 py-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col gap-2 lg:col-span-1">
          <Link href="/" className="flex flex-col justify-center gap-3">
            <Image
              src={logo}
              alt="The Age Collective logo"
              width={70}
              height={70}
              className="animate-spin-slow"
            />
            <div className="font-normal text-lg text-white leading-none tracking-[-1px]">
              the age collective
            </div>
          </Link>
          <p className="font-serif text-md text-white/80 italic">
            We're all aging. Let's talk about it.
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-normal font-sans text-[0.6rem] text-white uppercase tracking-[0.25em]">
            Explore
          </h3>
          <ul className="flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-sm transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h3 className="mb-5 font-normal font-sans text-[0.6rem] text-white uppercase tracking-[0.25em]">
            Projects
          </h3>
          <ul className="flex flex-col gap-3">
            {projectLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-sm transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stay Connected */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className="mb-5 font-normal font-sans text-[0.6rem] text-white uppercase tracking-[0.25em]">
            Stay Connected
          </h3>
          <div className="flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-white/20"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container">
        <div className="h-px bg-white/10" />
      </div>

      {/* Land acknowledgement + copyright */}
      <div className="container flex flex-col gap-4 py-8 text-white/80 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-sans text-xs leading-relaxed sm:max-w-2xl">
          {LAND_ACKNOWLEDGEMENT}
        </p>
        <p className="shrink-0 font-sans text-[0.6rem]">
          &copy; 2026 The Age Collective
        </p>
      </div>
    </footer>
  );
}
