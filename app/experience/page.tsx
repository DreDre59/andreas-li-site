import type { Metadata } from "next";
import experience from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and internship history.",
};

export default function ExperiencePage() {
  return (
    <div className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-14">
        <h1 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none">
          Experience
        </h1>
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 pb-1">
          {String(experience.length).padStart(2, "0")} roles
        </span>
      </div>

      <div className="max-w-2xl">
        {experience.map((entry, i) => (
          <div key={i} className="flex gap-8">
            <div className="flex flex-col items-center pt-2">
              <div className="w-3 h-3 bg-neutral-300 shrink-0" />
              <div className="w-px bg-neutral-200 flex-1 mt-2" />
            </div>
            <div className="pb-14">
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                {entry.start} — {entry.end}
              </span>
              <h2 className="font-display text-xl font-medium text-neutral-900 mt-2">
                {entry.role}
              </h2>
              <p className="font-display text-sm text-neutral-500 mt-0.5 font-medium">
                {entry.company}
              </p>
              {entry.description.split("\n\n").map((para, j) => (
                <p key={j} className="font-display text-sm text-neutral-500 mt-3 leading-relaxed max-w-lg">
                  {para}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 mt-4">
                {entry.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
