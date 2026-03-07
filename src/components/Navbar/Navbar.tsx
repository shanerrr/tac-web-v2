"use client";

import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useWebHaptics } from "web-haptics/react";
import logo from "../../../public/logo.svg";
import logoRings from "../../../public/logo-rings.svg";

type AccentColor = "primary" | "secondary" | "tertiary";

const accent: Record<
  AccentColor,
  { text: string; dot: string; hover: string; border: string }
> = {
  primary: {
    text: "text-primary",
    dot: "bg-primary",
    hover: "hover:bg-primary/8",
    border: "hover:border-l-primary",
  },
  secondary: {
    text: "text-secondary",
    dot: "bg-secondary",
    hover: "hover:bg-secondary/8",
    border: "hover:border-l-secondary",
  },
  tertiary: {
    text: "text-tertiary",
    dot: "bg-tertiary",
    hover: "hover:bg-tertiary/8",
    border: "hover:border-l-tertiary",
  },
};

type NavChild = {
  label: string;
  href: string;
  description?: string;
  accent?: AccentColor;
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
        accent: "secondary",
        accentLabel: "Written",
      },
      {
        label: "films",
        href: "/films",
        description: "Short films about aging told by real voices",
        accent: "primary",
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
        label: "My Aging Story",
        href: "/projects/my-aging-story",
        description:
          "An interactive exhibit exploring personal aging narratives",
        accent: "tertiary",
        accentLabel: "Exhibit",
      },
      {
        label: "GOLD",
        href: "/projects/gold",
        description:
          "Poems celebrating the golden threads of a life well-lived",
        accent: "secondary",
        accentLabel: "Poetry",
      },
    ],
  },
];

// --- Sub-components ---

const DropdownLink = memo(function DropdownLink({
  child,
}: {
  child: NavChild;
}) {
  const ac = child.accent ? accent[child.accent] : null;

  return (
    <Link
      href={child.href}
      className={`flex flex-col gap-1 border-l-2 border-l-transparent px-6 py-5 transition-all duration-200 ${ac?.hover ?? ""} ${ac?.border ?? ""}`}
    >
      {ac && (
        <span
          className={`font-sans text-[10px] uppercase tracking-[0.25em] ${ac.text}`}
        >
          {child.accentLabel}
        </span>
      )}
      <p
        className={`font-bold font-serif text-xl capitalize ${ac?.text ?? "text-foreground"}`}
      >
        {child.label}
      </p>
      {child.description && (
        <p className="font-sans text-foreground/45 text-sm leading-snug">
          {child.description}
        </p>
      )}
    </Link>
  );
});

const HamburgerIcon = memo(function HamburgerIcon({
  isOpen,
  bgColor = "bg-primary/60",
}: {
  isOpen: boolean;
  bgColor?: string;
}) {
  return (
    <div
      className={`flex h-11 w-11 flex-col items-end justify-around rounded-[10px] ${bgColor} p-[25%]`}
    >
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${
          isOpen ? "w-0 opacity-0 delay-200" : "w-full opacity-100 delay-0"
        }`}
      />
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${
          isOpen ? "w-0 opacity-0 delay-100" : "w-4/5 opacity-100 delay-100"
        }`}
      />
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${
          isOpen ? "w-0 opacity-0 delay-0" : "w-2/5 opacity-100 delay-200"
        }`}
      />
    </div>
  );
});

// --- Main component ---

export default function Navbar({
  textColor = "text-black",
  burgerBgColor = "bg-primary/60",
  transparent = false,
  scrollThreshold = 20,
}: {
  textColor?: string;
  burgerBgColor?: string;
  transparent?: boolean;
  scrollThreshold?: number;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { trigger } = useWebHaptics();

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent, scrollThreshold]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, []);

  const activeTextColor =
    transparent && scrolled ? "text-foreground" : textColor;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ease-in-out ${
          transparent
            ? scrolled
              ? `bg-white/95 ${menuOpen ? "" : "shadow-[0_1px_12px_rgba(175,65,6,0.06)]"} backdrop-blur-sm`
              : "bg-transparent"
            : ""
        }`}
      >
        <nav
          className={`container relative py-8 font-sans transition-colors duration-300 ${
            menuOpen ? "text-foreground" : activeTextColor
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo flex items-center gap-3">
              <Image
                src={logo}
                alt="The Age Collective logo"
                width={64}
                height={64}
                className="h-11 w-11 shrink-0 rounded-full transition-transform duration-500 group-hover/logo:scale-105 md:h-16 md:w-16"
              />
              <div className="flex flex-col justify-center font-normal text-lg leading-none md:h-16 md:text-2xl">
                <span>the age</span>
                <span>collective</span>
              </div>
            </Link>

            {/* ─── Desktop nav ─── */}
            <ol className="ml-8 hidden items-center md:flex">
              {navItems.map((item, idx) => {
                const isActive = item.href
                  ? pathname === item.href
                  : (item.children?.some((c) =>
                      pathname.startsWith(c.href),
                    ) ?? false);

                return (
                  <Fragment key={item.label}>
                    {/* Editorial dot separator */}
                    {idx > 0 && (
                      <li
                        aria-hidden="true"
                        className="mx-3 h-[3px] w-[3px] shrink-0 rounded-full bg-current opacity-15 lg:mx-5"
                      />
                    )}

                    {item.children ? (
                      <li className="group relative">
                        <button
                          type="button"
                          className="relative flex items-center gap-1.5 pb-1 font-serif text-lg italic lg:text-xl xl:text-[1.35rem]"
                        >
                          <span
                            className={
                              isActive
                                ? ""
                                : "opacity-75 transition-opacity duration-200 group-hover:opacity-100"
                            }
                          >
                            {item.label}
                          </span>
                          <ChevronDown
                            size={15}
                            className="opacity-40 transition-transform duration-300 group-hover:rotate-180"
                          />
                          {/* Animated underline — grows from center */}
                          <span
                            className={`pointer-events-none absolute -bottom-0.5 left-0 right-4 h-[1.5px] origin-center rounded-full bg-current transition-transform duration-300 ease-out ${
                              isActive
                                ? "scale-x-100 opacity-50"
                                : "scale-x-0 opacity-30 group-hover:scale-x-100 group-hover:opacity-40"
                            }`}
                          />
                        </button>

                        {/* Dropdown panel */}
                        <div
                          className={`pointer-events-none absolute top-full -translate-y-2 pt-3 opacity-0 transition-all duration-250 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 ${
                            item.menuAlign === "right"
                              ? "right-0"
                              : "left-1/2 -translate-x-1/2"
                          }`}
                        >
                          <div className="relative w-80 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/6">
                            {/* Warm accent top edge */}
                            <div className="h-[2px] bg-primary/25" />

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

                            {/* Dropdown items */}
                            <div className="relative flex flex-col divide-y divide-black/5">
                              {item.children.map((child) => (
                                <DropdownLink
                                  key={child.label}
                                  child={child}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ) : (
                      <li>
                        <Link
                          href={item.href ?? "/"}
                          className="group/link relative pb-1 font-serif text-lg italic lg:text-xl xl:text-[1.35rem]"
                        >
                          <span
                            className={
                              isActive
                                ? ""
                                : "opacity-75 transition-opacity duration-200 group-hover/link:opacity-100"
                            }
                          >
                            {item.label}
                          </span>
                          {/* Animated underline — grows from center */}
                          <span
                            className={`pointer-events-none absolute -bottom-0.5 left-0 right-0 h-[1.5px] origin-center rounded-full bg-current transition-transform duration-300 ease-out ${
                              isActive
                                ? "scale-x-100 opacity-50"
                                : "scale-x-0 opacity-30 group-hover/link:scale-x-100 group-hover/link:opacity-40"
                            }`}
                          />
                        </Link>
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ol>

            {/* Hamburger — mobile only */}
            <button
              className="relative h-11 w-11 md:hidden"
              type="button"
              onClick={() => {
                setMenuOpen((o) => !o);
                trigger();
              }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              >
                <HamburgerIcon isOpen={menuOpen} bgColor={burgerBgColor} />
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center rounded-[10px] ${burgerBgColor} p-[25%] transition-[opacity,transform] duration-500 ease-in-out ${
                  menuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0"
                }`}
              >
                <X className="h-full w-full text-white" />
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
        {/* Rings watermark */}
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
            alt="tree rings"
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
                    className={`transition-transform duration-300 ${
                      openSubmenu === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <ul
                  className={`flex flex-col gap-3 overflow-hidden font-light transition-[max-height,opacity] duration-300 ${
                    openSubmenu === item.label
                      ? "max-h-60 pt-4 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {item.children.map((child) => {
                    const ac = child.accent ? accent[child.accent] : null;
                    return (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={closeMenu}
                          className="flex items-center gap-4 text-3xl"
                        >
                          {ac && (
                            <span
                              className={`h-8 w-1 shrink-0 rounded-full ${ac.dot}`}
                            />
                          )}
                          <span className="flex flex-col">
                            {ac && (
                              <span
                                className={`font-sans text-[10px] uppercase tracking-[0.25em] ${ac.text}`}
                              >
                                {child.accentLabel}
                              </span>
                            )}
                            {child.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
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
