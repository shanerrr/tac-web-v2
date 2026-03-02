"use client";

import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/logo.jpg";

const navItems = [
  { label: "about us" },
  {
    label: "storytelling",
    children: ["stories", "documentaries"],
  },
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  function toggleSubmenu(label: string) {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  }

  return (
    <>
      <nav className="container relative z-50 mx-auto py-8 font-sans">
        <div className="flex items-center">
          <div className="flex items-center gap-6">
            <Image
              src={logo}
              alt="tac logo"
              className="h-11 w-11 rounded-full md:h-16 md:w-16"
            />
            <span className="font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl">
              the age collective
            </span>
          </div>

          {/* Desktop nav */}
          <ol className="ml-[10%] hidden grow items-center justify-between font-light text-lg md:flex lg:text-xl xl:text-2xl">
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
                  <ul className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="flex flex-col gap-3 whitespace-nowrap rounded-xl bg-white/80 px-6 py-4 text-xl shadow-sm backdrop-blur-sm">
                      {item.children.map((child) => (
                        <li
                          key={child}
                          className="transition-colors hover:text-primary"
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

          {/* Hamburger button — mobile only */}
          <button
            className="relative ml-auto h-11 w-11 md:hidden"
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {/* Hamburger */}
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
            >
              <HamburgerIcon isOpen={menuOpen} />
            </div>
            {/* X */}
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
        <ol className="flex flex-col items-center gap-10 font-serif text-5xl">
          {navItems.map((item) =>
            item.children ? (
              <li key={item.label} className="flex flex-col items-center">
                <button
                  className="flex items-center gap-2"
                  onClick={() => toggleSubmenu(item.label)}
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
                  className={`flex flex-col items-center gap-4 overflow-hidden font-light text-3xl transition-all duration-300 ${
                    openSubmenu === item.label
                      ? "max-h-40 pt-4 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
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
