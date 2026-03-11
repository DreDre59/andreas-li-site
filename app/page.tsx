import Image from "next/image";
import experience from "@/data/experience";
import { getAllProjects } from "@/lib/mdx";
import ProjectsGallery from "@/components/ProjectsGallery";

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className={`inline-block font-medium text-sm px-1.5 py-0.5 ${color ?? "bg-neutral-100 text-neutral-700"}`}>
      {children}
    </span>
  );
}

const highlights = [
  <>
    interning at <Badge color="bg-rose-50 text-rose-800">Tesla as a vehicle design engineer </Badge>for passive safety systems
  </>,
  <>
    assisted in <Badge color="bg-violet-50 text-violet-800">human-robot interaction research at SIRRL</Badge> in a study parted with the UW school of optometry
  </>,
  <>
    implemeted <Badge color="bg-sky-50 text-sky-800">Martinrea&apos;s first AMR material delivery system</Badge>, transporting 4,000 lb/hour of materials
  </>,
  <>
    built robots with my buddies and became the vex robotics competition<Badge color="bg-amber-50 text-amber-800">ontario provincial champions</Badge>, representing my province at world championships
  </>,
];

export default function Home() {
  const projects = getAllProjects();

  return (
    <div>
      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-8 max-w-7xl mx-auto">
        <div className="pt-8">
          <h1
            className="font-display font-extrabold uppercase text-neutral-900 leading-none"
            style={{ fontSize: "clamp(4rem, 11vw, 9rem)", letterSpacing: "-0.03em" }}
          >
            Andreas
          </h1>
          <div className="flex items-end gap-2">
            <h1
              className="font-display font-extrabold uppercase text-neutral-900 leading-none"
              style={{ fontSize: "clamp(4rem, 11vw, 9rem)", letterSpacing: "-0.03em" }}
            >
              Li
            </h1>
            <div className="relative -top-[37px] flex flex-col gap-0.5 -mb-[1em]">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Mechatronics &amp;
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Robotics Engineer
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-12 items-center">
          {/* ── About & Highlights (left) ── */}
          <div className="w-full md:w-1/2 space-y-10">
            {/* ── About Me ── */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                About
              </p>
              <p className="font-display text-neutral-600 leading-relaxed text-base">
                i build things that move, think, and interact with the real world.
                studying{" "}
                <Badge color="bg-emerald-50 text-emerald-800">mechatronics engineering</Badge> at the{" "}
                <Badge color="bg-amber-50 text-amber-800">University of Waterloo</Badge>.
              </p>
              <p className="font-display text-neutral-500 leading-relaxed text-sm mt-4">
                i started in competitive robotics 7 years ago, building robots throughout
                middle and high school, and eventually deciding to go "pro" and turn my hobby into a
                career. my work sits at the intersection of{" "}
                <Badge color="bg-sky-50 text-sky-800">mechanical design</Badge>,{" "}
                <Badge color="bg-rose-50 text-rose-800">electronics</Badge>, and{" "}
                <Badge color="bg-violet-50 text-violet-800">controls</Badge>. i like taking ideas from
                concept to physical prototype, from CAD and circuit design through
                testing and integration.
              </p>
            </div>

            {/* ── Highlights ── */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                Cool stuff I&apos;ve done
              </p>
              <ul className="space-y-3">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="font-display text-sm text-neutral-500 leading-relaxed flex gap-3"
                  >
                    <span className="text-neutral-300 shrink-0 mt-0.5 select-none">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Profile Banner (right) ── */}
          <div className="w-full md:w-1/2 shrink-0">
            <Image
              src="/photos/profile.jpeg"
              alt="Profile banner"
              width={1400}
              height={400}
              className="w-full h-auto"
              priority
            />
            <div className="mt-4 flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/andreasli/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:andreas.li@uwaterloo.ca"
                className="font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            Email
          </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-neutral-100" />

      {/* ── Experience ── */}
      <section id="experience" className="py-20 px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex items-end justify-between mb-14">
          <h2 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none">
            Experience
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 pb-1">
            {String(experience.length).padStart(2, "0")} roles
          </span>
        </div>

        <div>
          {experience.map((entry, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 items-stretch pb-14">
              {/* ── Image (left) ── */}
              <div className="w-full md:w-1/2 shrink-0 relative overflow-hidden min-h-[200px]">
                {entry.image ? (
                  <Image
                    src={`/photos/experience/${entry.image}`}
                    alt={`${entry.company} photo`}
                    fill
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-100 border border-neutral-200" />
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
                    <h3 className="font-display text-xl font-bold text-neutral-900">
                      {entry.role}
                    </h3>
                    <p className="font-display text-sm font-bold">
                      <a
                        href={({ Tesla: "https://www.tesla.com/", "UWaterloo SIRRL": "https://uwaterloo.ca/social-intelligent-robotics-research-lab/", "Martinrea International": "https://www.martinrea.com/" } as Record<string, string>)[entry.company] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block px-1.5 py-0.5 font-medium text-sm hover:opacity-80 transition-opacity ${
                          ({ Tesla: "bg-rose-50 text-rose-800", "UWaterloo SIRRL": "bg-violet-50 text-violet-800", "Martinrea International": "bg-sky-50 text-sky-800" } as Record<string, string>)[entry.company] || "bg-neutral-100 text-neutral-700"
                        }`}
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
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-neutral-100" />

      {/* ── Projects ── */}
      <section id="projects" className="py-20 px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none">
            Projects
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 pb-1">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
        <ProjectsGallery projects={projects} />
      </section>

      {/* ── Divider ── */}
      <div className="border-t border-neutral-100" />

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-8 max-w-7xl mx-auto scroll-mt-20">
        <h2 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none mb-4">
          Let&apos;s Connect
        </h2>
        <p className="font-display text-neutral-400 text-sm max-w-md leading-relaxed mb-8">
          Interested in collaborating, have a question, or just want to say hello?
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/andreasli/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-neutral-900 border-2 border-neutral-900 px-5 py-3 hover:bg-neutral-900 hover:text-white transition-all duration-200 tracking-widest uppercase"
          >
            LinkedIn &rarr;
          </a>
          <a
            href="mailto:andreas.li@uwaterloo.ca"
            className="font-mono text-xs text-neutral-900 border-2 border-neutral-900 px-5 py-3 hover:bg-neutral-900 hover:text-white transition-all duration-200 tracking-widest uppercase"
          >
            Email &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
