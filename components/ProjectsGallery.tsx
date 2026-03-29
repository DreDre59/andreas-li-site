"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ProjectMeta } from "@/lib/mdx";

const bgColors = ["#eae8e5", "#e0ddd8", "#d6d3ce", "#ece9e5", "#dfdcd7", "#d9d6d1"];

// Uniform aspect ratio for all project cards
const CARD_ASPECT = "aspect-[4/3]";

interface Props {
  projects: ProjectMeta[];
}

export default function ProjectsGallery({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
  const filters = ["all", ...allTags];

  const filtered = activeFilter && activeFilter !== "all"
    ? projects.filter((p) => p.tags.includes(activeFilter))
    : projects;

  return (
    <div>
      {/* Filters — commented out for now
      {allTags.length > 0 && (
        <div className="flex items-center gap-3 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f === "all" ? null : f)}
              className={`font-mono text-xs tracking-widest uppercase px-3 py-1.5 transition-all duration-200 ${
                (f === "all" && !activeFilter) || activeFilter === f
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-400 hover:text-neutral-900 border border-neutral-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      */}

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <p className="text-neutral-500 text-sm">No projects found.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filtered.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group cursor-pointer break-inside-avoid mb-6 block"
            >
              <div
                className={`w-full ${CARD_ASPECT} overflow-hidden relative`}
                style={{ backgroundColor: bgColors[i % bgColors.length] }}
              >
                {/* Thumbnail or placeholder */}
                {project.thumbnail ? (
                  <Image
                    src={`/content/projects/${project.slug}/${project.thumbnail}`}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-neutral-400 text-xs tracking-widest uppercase">
                      {project.tags[0] || "Project"}
                    </span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-neutral-900 opacity-0 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-base font-extrabold uppercase tracking-tight font-display">
                    {project.title}
                  </h3>
                  <p className="font-display text-sm text-neutral-400 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs text-neutral-500 border border-neutral-600 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
