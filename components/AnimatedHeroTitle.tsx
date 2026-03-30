"use client";

import { motion } from "motion/react";

const letterStagger = 0.11;
const letterDuration = 0.825;

function AnimatedWord({ word, startDelay }: { word: string; startDelay: number }) {
  return (
    <span className="inline-flex" aria-label={word}>
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: letterDuration,
            ease: "easeOut",
            delay: startDelay + i * letterStagger,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function AnimatedHeroTitle() {
  const andreasEnd = "Andreas".length * letterStagger;
  const liStart = andreasEnd + 0.15;
  const liEnd = liStart + "Li".length * letterStagger;
  const subtitleDelay = liEnd + 0.3;

  return (
    <div className="pt-8">
      <h1
        className="font-display font-extrabold uppercase text-neutral-900 leading-none"
        style={{ fontSize: "clamp(4rem, 11vw, 9rem)", letterSpacing: "-0.03em" }}
      >
        <AnimatedWord word="Andreas" startDelay={0} />
      </h1>
      <div className="flex items-end gap-2">
        <h1
          className="font-display font-extrabold uppercase text-neutral-900 leading-none"
          style={{ fontSize: "clamp(4rem, 11vw, 9rem)", letterSpacing: "-0.03em" }}
        >
          <AnimatedWord word="Li" startDelay={liStart} />
        </h1>
        <motion.div
          className="relative -top-[37px] flex flex-col gap-0.5 -mb-[1em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.375, ease: "easeOut", delay: subtitleDelay }}
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
