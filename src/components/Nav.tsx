"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/lib/types";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ profile }: { profile: Profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="flex justify-between items-center h-20 px-margin-x max-w-[1280px] mx-auto">
        <div className="text-2xl font-bold text-primary">{profile?.name}</div>
        <div className="hidden lg:flex gap-6 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${profile?.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-vibrant-gradient text-on-primary px-6 py-2.5 rounded-full text-sm font-bold soft-shadow hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
          >
            Let&apos;s Talk
          </a>
        </div>
        <button className="lg:hidden text-primary" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-outline-variant/20 px-margin-x py-stack-md flex flex-col gap-stack-md">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-on-surface-variant font-medium hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${profile?.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-vibrant-gradient text-on-primary px-8 py-3 rounded-full font-bold soft-shadow text-center"
          >
            Let&apos;s Talk
          </a>
        </div>
      )}
    </nav>
  );
}
