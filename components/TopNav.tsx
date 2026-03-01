"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FileDown, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Name */}
          <Link
            href="/"
            className="font-display font-extrabold uppercase tracking-tight text-sm text-neutral-900 hover:text-neutral-500 transition-colors"
          >
            Andreas Li
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive(href)
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-900"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest px-3 py-1.5 hover:bg-neutral-700 transition-colors"
            >
              <FileDown size={12} />
              Resume
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-14">
          <nav className="flex flex-col p-6 gap-6 border-t border-neutral-100">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive(href)
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-900"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-1.5 bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest px-3 py-1.5 w-fit hover:bg-neutral-700 transition-colors"
            >
              <FileDown size={12} />
              Resume
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
