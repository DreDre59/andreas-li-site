"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  // { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
];

const childVariants = {
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(4px)" },
};

function ResumeButton() {
  const [downloaded, setDownloaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <motion.a
      href="/resume.pdf"
      download
      className="inline-flex items-center gap-1.5 bg-neutral-900 text-white font-mono text-xs uppercase tracking-widest px-3 py-1.5 cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={() => {
        if (!downloaded) {
          setDownloaded(true);
          timeoutRef.current = setTimeout(() => setDownloaded(false), 2000);
        }
      }}
      style={{ willChange: "transform" }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={downloaded ? "done" : "default"}
          className="flex items-center gap-1.5"
          layout="position"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            staggerChildren: downloaded ? 0.15 : 0,
          }}
        >
          <motion.span className="flex items-center" variants={childVariants}>
            {downloaded ? (
              <motion.svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M4 12l5 5L20 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                />
              </motion.svg>
            ) : (
              <FileDown size={12} />
            )}
          </motion.span>
          <motion.span variants={childVariants}>
            {downloaded ? "Downloaded!" : "Resume"}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </motion.a>
  );
}

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
            <ResumeButton />
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
            <ResumeButton />
          </nav>
        </div>
      )}
    </>
  );
}
