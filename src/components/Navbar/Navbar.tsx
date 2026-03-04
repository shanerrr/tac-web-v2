"use client";

import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import logo from "../../../public/logo.svg";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  { label: "about us", href: "/about" },
  {
    label: "storytelling",
    children: [
      { label: "stories", href: "/stories" },
      { label: "films", href: "/films" },
      { label: "poetry", href: "/poetry" },
    ],
  },
  { label: "resources", href: "/resources" },
  { label: "events", href: "/events" },
];

const HamburgerIcon = memo(function HamburgerIcon({
  isOpen,
}: {
  isOpen: boolean;
}) {
  return (
    <div className="flex h-11 w-11 flex-col items-end justify-around rounded-[10px] bg-primary/60 p-[25%]">
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-200" : "w-full opacity-100 delay-0"}`}
      />
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-100" : "w-4/5 opacity-100 delay-100"}`}
      />
      <span
        className={`block h-px bg-white transition-[width,opacity] duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-0" : "w-2/5 opacity-100 delay-200"}`}
      />
    </div>
  );
});

export default function Navbar({
  textColour = "text-black",
}: {
  textColour?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, []);

  return (
    <>
      <nav
        className={`container relative z-50 py-8 font-sans transition-colors duration-300 ${menuOpen ? "text-black" : textColour}`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="The Age Collective logo"
              width={64}
              height={64}
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
                  <ul className="-translate-x-1/2 -translate-y-1 pointer-events-none absolute top-full left-1/2 pt-3 opacity-0 transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex flex-col gap-3 whitespace-nowrap rounded-xl bg-white/80 px-6 py-4 text-base shadow-sm backdrop-blur-sm">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="text-black transition-colors hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href ?? "/"}
                    className="transition-colors hover:text-primary"
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
              className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-in-out ${menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
            >
              <HamburgerIcon isOpen={menuOpen} />
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-[10px] bg-primary/60 p-[25%] transition-[opacity,transform] duration-500 ease-in-out ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`}
            >
              <X className="h-full w-full" color="white" />
            </div>
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        style={{
          backgroundImage: "url('/texture.jpg')",
          backgroundRepeat: "repeat",
        }}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-[opacity,transform] duration-500 ease-in-out md:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "-translate-y-8 pointer-events-none opacity-0"
        }`}
      >
        <ol className="flex flex-col items-center gap-10 font-serif text-4xl">
          {navItems.map((item) =>
            item.children ? (
              <li key={item.label} className="flex flex-col items-center">
                <button
                  type="button"
                  className="flex items-center gap-2"
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
                  className={`flex flex-col items-center gap-4 overflow-hidden font-light text-3xl transition-[max-height,opacity] duration-300 ${openSubmenu === item.label ? "max-h-40 pt-4 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link href={child.href} onClick={closeMenu}>
                        {child.label}
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
