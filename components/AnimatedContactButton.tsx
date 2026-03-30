"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const childVariants = {
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(4px)" },
};

interface Props {
  href: string;
  label: string;
  confirmLabel: string;
  external?: boolean;
}

export default function AnimatedContactButton({
  href,
  label,
  confirmLabel,
  external = false,
}: Props) {
  const [clicked, setClicked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center font-mono text-xs text-neutral-900 border-2 border-neutral-900 px-5 py-3 tracking-widest uppercase cursor-pointer overflow-hidden hover:bg-neutral-900 hover:text-white transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={() => {
        if (!clicked) {
          setClicked(true);
          timeoutRef.current = setTimeout(() => setClicked(false), 2000);
        }
      }}
      style={{ willChange: "transform" }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={clicked ? "done" : "default"}
          className="flex items-center gap-1.5"
          layout="position"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            staggerChildren: clicked ? 0.15 : 0,
          }}
        >
          <motion.span className="flex items-center" variants={childVariants}>
            {clicked ? (
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
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: 0.1,
                  }}
                />
              </motion.svg>
            ) : null}
          </motion.span>
          <motion.span variants={childVariants}>
            {clicked ? confirmLabel : label}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </motion.a>
  );
}
