"use client";

import { motion } from "motion/react";
import AnimatedBadge from "./AnimatedBadge";

const AB = AnimatedBadge;

export default function AnimatedHeroContent() {
  return (
    <motion.div
      className="w-full md:w-1/2 space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
    >
      {/* ── About Me ── */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
          About
        </p>
        <p className="font-display text-neutral-500 leading-relaxed text-sm">
          i build things that move, think, and interact with the real world.
          studying{" "}
          <AB color="bg-emerald-50 text-emerald-800" delay={0}>mechatronics engineering</AB> at the{" "}
          <AB color="bg-amber-50 text-amber-800" delay={0.1}>University of Waterloo</AB>.
        </p>
        <p className="font-display text-neutral-500 leading-relaxed text-sm mt-4">
          i started in competitive robotics 7 years ago, building robots throughout
          middle and high school, and eventually deciding to go &quot;pro&quot; and turn my hobby into a
          career. my work sits at the intersection of{" "}
          <AB color="bg-sky-50 text-sky-800" delay={0.2}>mechanical design</AB>,{" "}
          <AB color="bg-rose-50 text-rose-800" delay={0.3}>electronics</AB>, and{" "}
          <AB color="bg-violet-50 text-violet-800" delay={0.4}>controls</AB>.
        </p>
      </div>

      {/* ── Highlights ── */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
          Cool stuff I&apos;ve done
        </p>
        <ul className="space-y-3">
          <li className="font-display text-sm text-neutral-500 leading-relaxed flex gap-3">
            <span className="text-neutral-300 shrink-0 mt-0.5 select-none">—</span>
            <span>
              interning at <AB color="bg-rose-50 text-rose-800" delay={0.1}>Tesla as a vehicle design engineer </AB>for passive safety systems
            </span>
          </li>
          <li className="font-display text-sm text-neutral-500 leading-relaxed flex gap-3">
            <span className="text-neutral-300 shrink-0 mt-0.5 select-none">—</span>
            <span>
              assisted in <AB color="bg-violet-50 text-violet-800" delay={0.1}>human-robot interaction research at SIRRL</AB> in a study partnered with the UWaterloo School of Optometry
            </span>
          </li>
          <li className="font-display text-sm text-neutral-500 leading-relaxed flex gap-3">
            <span className="text-neutral-300 shrink-0 mt-0.5 select-none">—</span>
            <span>
              implemented <AB color="bg-sky-50 text-sky-800" delay={0.1}>Martinrea&apos;s first autonomous mobile robot system</AB> for material delivery, transporting 4,000 lb/hour of materials
            </span>
          </li>
          <li className="font-display text-sm text-neutral-500 leading-relaxed flex gap-3">
            <span className="text-neutral-300 shrink-0 mt-0.5 select-none">—</span>
            <span>
              built robots with my buddies and won the vex robotics competition <AB color="bg-amber-50 text-amber-800" delay={0.1}>ontario provincial championship</AB>, representing my province at world championships in Dallas Texas
            </span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
