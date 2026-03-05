"use client";

import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import logo from "../../../public/logo.svg";
import logoRings from "../../../public/logo-rings.svg";

type NavChild = {
  label: string;
  href: string;
  description?: string;
  colorClass?: string;
  color?: string;
  accentLabel?: string;
};
type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  logoCorner?: "bottom-left" | "bottom-right";
  menuAlign?: "center" | "right";
};

const navItems: NavItem[] = [
  { label: "about us", href: "/about" },
  {
    label: "storytelling",
    logoCorner: "bottom-right",
    children: [
      {
        label: "stories",
        href: "/stories",
        description: "Personal stories about aging from across the lifespan",
        colorClass: "bg-secondary",
        color: "#d96900",
        accentLabel: "Written",
      },
      {
        label: "films",
        href: "/films",
        description: "Short films about aging told by real voices",
        colorClass: "bg-primary",
        color: "#af4106",
        accentLabel: "Visual",
      },
    ],
  },
  { label: "resources", href: "/resources" },
  {
    label: "projects",
    logoCorner: "bottom-left",
    menuAlign: "right",
    children: [
      {
        label: "My Aging Story Exhibit",
        href: "/projects/my-aging-story",
        description:
          "An interactive exhibit exploring personal aging narratives",
        colorClass: "bg-tertiary",
        color: "#b39c66",
        accentLabel: "Exhibit",
      },
      {
        label: "GOLD Poetry Project",
        href: "/projects/gold",
        description:
          "Poems celebrating the golden threads of a life well-lived",
        colorClass: "bg-secondary",
        color: "#d96900",
        accentLabel: "Poetry",
      },
    ],
  },
];

const DropdownLink = memo(function DropdownLink({
  child,
}: {
  child: NavChild;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={child.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col gap-0.5 px-5 py-4 transition-colors duration-200"
      style={{ backgroundColor: hovered ? `${child.color}18` : undefined }}
    >
      <span
        className="font-sans text-xs uppercase tracking-[0.25em] transition-colors duration-200"
        style={{ color: child.color }}
      >
        {child.accentLabel}
      </span>
      <p
        className="font-bold font-serif text-xl capitalize transition-colors duration-200"
        style={{ color: hovered ? child.color : child.color }}
      >
        {child.label}
      </p>
      {child.description && (
        <p className="font-sans text-foreground/50 text-sm leading-snug">
          {child.description}
        </p>
      )}
    </Link>
  );
});

const HamburgerIcon = memo(function HamburgerIcon({
  isOpen,
}: {
  isOpen: boolean;
}) {
  return (
    <div className="flex h-11 w-11 flex-col items-end justify-around rounded-[10px] bg-primary/60 p-[25%]">
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-200ms" : "w-full opacity-100 delay-0"}`}
      />
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-100" : "w-4/5 opacity-100 delay-100"}`}
      />
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-0" : "w-2/5 opacity-100 delay-200ms"}`}
      />
    </div>
  );
});

export default function Navbar({
  textColour = "text-black",
  burgerBgColour,
  transparent = false,
  scrollThreshold = 20,
}: {
  textColour?: string;
  burgerBgColour: string;
  transparent?: boolean;
  scrollThreshold?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll(); // check on mount in case page loads mid-scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent, scrollThreshold]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, []);

  // When scrolled, always use dark text so it reads on the white background
  const activeTextColour =
    transparent && scrolled ? "text-foreground" : textColour;

  // Hover box tint: white wash on dark/transparent bg, dark wash on white bg
  const hoverBoxClass =
    transparent && !scrolled
      ? "hover:bg-white/15 rounded-lg px-3 py-1"
      : "hover:bg-foreground/8 rounded-lg px-3 py-1";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ease-in-out ${
          transparent
            ? scrolled
              ? `bg-white/95 ${menuOpen ? "" : "shadow-sm"} backdrop-blur-sm`
              : "bg-transparent"
            : ""
        }`}
      >
        <nav
          className={`container relative py-8 font-sans transition-colors duration-300 ${menuOpen ? "text-foreground" : activeTextColour}`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={logo}
                alt="The Age Collective logo"
                width={64}
                height={64}
                sizes="(max-width: 768px) 44px, 64px"
                className="h-11 w-11 shrink-0 rounded-full md:h-16 md:w-16"
              />
              <div className="flex flex-col justify-center font-normal text-lg leading-none md:h-16 md:text-2xl">
                <span>the age</span>
                <span>collective</span>
              </div>
            </Link>

            {/* Desktop nav — CSS hover, no state needed */}
            <ol className="ml-8 hidden items-center gap-8 font-light text-lg md:flex lg:gap-12 lg:text-xl xl:text-2xl">
              {navItems.map((item) =>
                item.children ? (
                  <li key={item.label} className="group relative">
                    <button type="button" className="flex items-center gap-1">
                      {item.label}
                      <ChevronDown
                        size={20}
                        className="transition-transform duration-200 group-hover:rotate-180"
                      />
                    </button>
                    <div
                      className={`pointer-events-none absolute top-full -translate-y-1 pt-3 opacity-0 transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 ${item.menuAlign === "right" ? "right-0" : "left-1/2 -translate-x-1/2"}`}
                    >
                      <div className="relative w-72 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/8">
                        {/* Corner rings watermark */}
                        <div
                          className="pointer-events-none absolute"
                          style={{
                            bottom: "-80px",
                            ...(item.logoCorner === "bottom-left"
                              ? { left: "-80px" }
                              : { right: "-80px" }),
                          }}
                        >
                          <Image
                            src={logoRings}
                            alt=""
                            width={180}
                            height={180}
                            className="opacity-5"
                            style={{ filter: "invert(1)" }}
                          />
                        </div>
                        {/* List items */}
                        <div className="relative flex flex-col divide-y divide-black/6">
                          {item.children.map((child) => (
                            <DropdownLink key={child.label} child={child} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "/"}
                      className={`transition-[background-color] duration-200 ${hoverBoxClass}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ol>

            {/* Hamburger — mobile only */}
            <button
              className="relative h-11 w-11 md:hidden"
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`}
              >
                <HamburgerIcon isOpen={menuOpen} />
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center rounded-[10px] ${burgerBgColour} p-[25%] transition-[opacity,transform] duration-500 ease-in-out ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`}
              >
                <X className="h-full w-full" color="white" />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center overflow-hidden bg-white transition-[opacity,transform] duration-500 ease-in-out md:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Rings watermark — large, off-center bottom-right */}
        <div
          className="pointer-events-none absolute animate-spin-slow"
          style={{
            width: "min(100vw, 100vh)",
            height: "min(100vw, 100vh)",
            bottom: "calc(min(100vw, 100vh) / -2)",
            right: "calc(min(100vw, 100vh) / -2)",
          }}
        >
          <Image
            src={logoRings}
            alt=""
            fill
            className="object-contain opacity-[0.06]"
            style={{ filter: "invert(1)" }}
          />
        </div>

        <ol className="container relative flex flex-col gap-10 font-serif text-4xl">
          {navItems.map((item) =>
            item.children ? (
              <li key={item.label} className="flex flex-col">
                <button
                  type="button"
                  className="flex items-center gap-2 self-start"
                  onClick={() =>
                    setOpenSubmenu((p) =>
                      p === item.label ? null : item.label,
                    )
                  }
                >
                  {item.label}
                  <ChevronDown
                    size={28}
                    className={`transition-transform duration-300 ${openSubmenu === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                <ul
                  className={`flex flex-col gap-3 overflow-hidden font-light transition-[max-height,opacity] duration-300 ${openSubmenu === item.label ? "max-h-60 pt-4 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        onClick={closeMenu}
                        className="flex items-center gap-4 text-3xl"
                      >
                        {child.color && (
                          <span
                            className="h-8 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: child.color }}
                          />
                        )}
                        <span className="flex flex-col">
                          <span
                            className="font-sans text-[10px] uppercase tracking-[0.25em]"
                            style={{ color: child.color }}
                          >
                            {child.accentLabel}
                          </span>
                          {child.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                <Link href={item.href ?? "/"} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ol>
      </div>
    </>
  );
}
