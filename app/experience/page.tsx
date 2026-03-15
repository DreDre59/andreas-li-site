import type { Metadata } from "next";
import Image from "next/image";
import experience from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience and internship history.",
};

const companyHighlight: Record<string, string> = {
  Tesla: "bg-rose-50 text-rose-800",
  "UWaterloo SIRRL": "bg-violet-50 text-violet-800",
  "Martinrea International": "bg-sky-50 text-sky-800",
};

const companyUrl: Record<string, string> = {
  Tesla: "https://www.tesla.com/",
  "UWaterloo SIRRL": "https://uwaterloo.ca/social-intelligent-robotics-research-lab/",
  "Martinrea International": "https://www.martinrea.com/",
};

export default function ExperiencePage() {
  return (
    <div className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 mb-14">
        <h1 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none">
          Experience
        </h1>
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 pb-1 shrink-0 flex flex-col items-start md:flex-row md:gap-1 leading-tight">
          <span>{String(experience.length).padStart(2, "0")}</span>
          <span>roles</span>
        </span>
      </div>

      <div>
        {experience.map((entry, i) => (
          <div key={i} className="flex flex-col-reverse md:flex-row gap-8 items-start pb-14">
            {/* ── Image (left) ── */}
            <div className="w-full md:w-1/2 shrink-0 h-[200px] md:h-[345px] relative overflow-hidden">
              {entry.image ? (
                <Image
                  src={`/photos/experience/${entry.image}`}
                  alt={`${entry.company} photo`}
                  fill
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100 border border-neutral-200" />
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
                  <h2 className="font-display text-xl font-bold text-neutral-900">
                    {entry.role}
                  </h2>
                  <p className="font-display text-sm font-bold">
                    <a
                      href={companyUrl[entry.company] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block px-1.5 py-0.5 font-medium text-sm hover:opacity-80 transition-opacity ${companyHighlight[entry.company] || "bg-neutral-100 text-neutral-700"}`}
                    >
                      {entry.company}
                    </a>
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                {entry.start} — {entry.end}
              </span>
              {entry.description.split("\n\n").map((para, j) => (
                <p key={j} className="font-display text-sm text-neutral-500 mt-3 leading-relaxed font-medium">
                  {para}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 mt-4">
                {entry.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-xs px-2.5 py-1 rounded-sm border ${
                      ({ Tesla: "bg-rose-50 text-rose-700 border-rose-200", "UWaterloo SIRRL": "bg-violet-50 text-violet-700 border-violet-200", "Martinrea International": "bg-sky-50 text-sky-700 border-sky-200" } as Record<string, string>)[entry.company] || "text-neutral-500 bg-neutral-50 border-neutral-200"
                    }`}
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
