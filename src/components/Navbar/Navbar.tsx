"use client";

import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo.svg";

const navItems = [
  { label: "about us" },
  { label: "storytelling", children: ["stories", "films", "poetry"] },
  { label: "resources" },
  { label: "events" },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex h-11 w-11 flex-col items-end justify-around rounded-[10px] bg-primary/60 p-[25%]">
      <span
        className={`block h-px bg-white transition-all duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-200" : "w-full opacity-100 delay-0"}`}
      />
      <span
        className={`block h-px bg-white transition-all duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-100" : "w-4/5 opacity-100 delay-100"}`}
      />
      <span
        className={`block h-px bg-white transition-all duration-300 ease-in-out ${isOpen ? "w-0 opacity-0 delay-0" : "w-2/5 opacity-100 delay-200"}`}
      />
    </div>
  );
}

export default function Navbar({
  textColour = "text-black",
}: {
  textColour: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <>
      <nav className={`container relative z-50 py-8 font-sans ${textColour}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo}
              alt="tac logo"
              width={64}
              height={64}
              className="h-11 w-11 shrink-0 rounded-full md:h-16 md:w-16"
            />
            <div className="flex flex-col justify-center font-normal text-base leading-none md:h-16 md:text-2xl">
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
                  <ul className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex flex-col gap-3 whitespace-nowrap rounded-xl bg-white/80 px-6 py-4 text-base shadow-sm backdrop-blur-sm">
                      {item.children.map((child) => (
                        <li
                          key={child}
                          className="cursor-pointer text-black transition-colors hover:text-primary"
                        >
                          {child}
                        </li>
                      ))}
                    </div>
                  </ul>
                </li>
              ) : (
                <li key={item.label}>{item.label}</li>
              ),
            )}
          </ol>

          {/* Hamburger — mobile only */}
          <button
            className="relative h-11 w-11 md:hidden"
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
            >
              <HamburgerIcon isOpen={menuOpen} />
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-[10px] bg-primary/60 p-[25%] transition-all duration-500 ease-in-out ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`}
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
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-8 opacity-0"
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
                  className={`flex flex-col items-center gap-4 overflow-hidden font-light text-3xl transition-all duration-300 ${openSubmenu === item.label ? "max-h-40 pt-4 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {item.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>{item.label}</li>
            ),
          )}
        </ol>
      </div>
    </>
  );
}
