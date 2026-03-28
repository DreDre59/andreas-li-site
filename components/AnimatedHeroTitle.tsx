"use client";

import { motion } from "motion/react";

export default function AnimatedHeroTitle() {
  return (
    <div className="pt-8">
      <motion.h1
        className="font-display font-extrabold uppercase text-neutral-900 leading-none"
        style={{ fontSize: "clamp(4rem, 11vw, 9rem)", letterSpacing: "-0.03em" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Andreas
      </motion.h1>
      <div className="flex items-end gap-2">
        <motion.h1
          className="font-display font-extrabold uppercase text-neutral-900 leading-none"
          style={{ fontSize: "clamp(4rem, 11vw, 9rem)", letterSpacing: "-0.03em" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          Li
        </motion.h1>
        <motion.div
          className="relative -top-[37px] flex flex-col gap-0.5 -mb-[1em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Mechatronics &amp;
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
            Robotics Engineer
          </span>
        </motion.div>
      </div>
    </div>
  );
}
