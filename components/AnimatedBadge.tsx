"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";

// Map Tailwind badge classes to actual color values for animation
const colorMap: Record<string, { bg: string; text: string }> = {
  "bg-emerald-50 text-emerald-800": { bg: "rgb(236 253 245)", text: "rgb(6 95 70)" },
  "bg-amber-50 text-amber-800": { bg: "rgb(255 251 235)", text: "rgb(146 64 14)" },
  "bg-sky-50 text-sky-800": { bg: "rgb(240 249 255)", text: "rgb(7 89 133)" },
  "bg-rose-50 text-rose-800": { bg: "rgb(255 241 242)", text: "rgb(159 18 57)" },
  "bg-violet-50 text-violet-800": { bg: "rgb(245 243 255)", text: "rgb(91 33 182)" },
  "bg-neutral-100 text-neutral-700": { bg: "rgb(245 245 245)", text: "rgb(64 64 64)" },
};

interface AnimatedBadgeProps {
  children: ReactNode;
  color?: string;
  delay?: number;
}

export default function AnimatedBadge({
  children,
  color = "bg-neutral-100 text-neutral-700",
  delay = 0,
}: AnimatedBadgeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const colors = colorMap[color] ?? colorMap["bg-neutral-100 text-neutral-700"];

  return (
    <motion.span
      ref={ref}
      className="inline-block font-medium text-sm px-1.5 py-0.5"
      initial={{ backgroundColor: "rgba(0,0,0,0)", color: "rgb(115 115 115)" }}
      animate={
        isInView
          ? { backgroundColor: colors.bg, color: colors.text }
          : { backgroundColor: "rgba(0,0,0,0)", color: "rgb(115 115 115)" }
      }
      transition={{ duration: 0.75, ease: "easeOut", delay: isInView ? delay : 0 }}
    >
      {children}
    </motion.span>
  );
}
