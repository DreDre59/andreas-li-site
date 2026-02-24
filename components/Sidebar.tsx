"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Github, Linkedin, Mail, FileDown, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

const socialLinks = [
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:your@email.com", label: "Email", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="mb-8">
        <Link href="/" className="block" onClick={() => setMobileOpen(false)}>
          <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
            Portfolio
          </p>
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
            Your Name
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Mechatronics & Robotics Engineer
          </p>
        </Link>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-1 mb-4">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
          <ThemeToggle />
        </div>

        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors font-medium"
        >
          <FileDown size={14} />
          Download Resume
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-56 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 z-40">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-between px-4 z-40">
        <Link href="/" className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Your Name
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative flex flex-col w-64 h-full bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 p-6 z-50">
            <NavContent />
          </div>
        </div>
      )}
    </>
  );
}
