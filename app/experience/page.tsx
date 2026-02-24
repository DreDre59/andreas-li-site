import type { Metadata } from "next";
import experience from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and internship history.",
};

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">
      {label}
    </span>
  );
}

export default function ExperiencePage() {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
        Experience
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-10">
        Work History
      </h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800" />

        <div className="space-y-12">
          {experience.map((entry, i) => (
            <div key={i} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 -translate-x-[3px]" />

              <div className="mb-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {entry.role}
                  </h2>
                  <span className="text-neutral-500 dark:text-neutral-400 text-sm hidden sm:inline">
                    —
                  </span>
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium text-sm">
                    {entry.company}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {entry.start} – {entry.end}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {entry.skills.map((skill) => (
                  <SkillTag key={skill} label={skill} />
                ))}
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {entry.description.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
