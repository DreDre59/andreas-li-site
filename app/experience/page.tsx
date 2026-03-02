import type { Metadata } from "next";
import Image from "next/image";
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

      <div>
        {experience.map((entry, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8 items-center pb-14">
            {/* ── Image (left) ── */}
            <div className="w-full md:w-2/5 shrink-0">
              {entry.image ? (
                <Image
                  src={`/photos/experience/${entry.image}`}
                  alt={`${entry.company} photo`}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full aspect-[3/2] bg-neutral-100 border border-neutral-200" />
              )}
            </div>

            {/* ── Text (right) ── */}
            <div className="w-full md:w-3/5">
              <div className="flex items-center gap-3 mb-2">
                {entry.logo && (
                  <Image
                    src={`/logos/${entry.logo}`}
                    alt={`${entry.company} logo`}
                    width={150}
                    height={150}
                    className="w-10 h-10 rounded-sm border border-neutral-200 shadow-sm object-contain shrink-0"
                  />
                )}
                <div>
                  <h2 className="font-display text-xl font-medium text-neutral-900">
                    {entry.role}
                  </h2>
                  <p className="font-display text-sm text-neutral-500 font-medium">
                    {entry.company}
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                {entry.start} — {entry.end}
              </span>
              {entry.description.split("\n\n").map((para, j) => (
                <p key={j} className="font-display text-sm text-neutral-500 mt-3 leading-relaxed">
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
