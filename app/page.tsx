import Image from "next/image";
import experience from "@/data/experience";
import { getAllProjects } from "@/lib/mdx";
import ProjectsGallery from "@/components/ProjectsGallery";

type BadgeVariant = "default" | "achievement" | "technical" | "company" | "skill" | "hardware";

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-700",
  achievement: "bg-amber-50 text-amber-800",
  technical: "bg-sky-50 text-sky-800",
  company: "bg-emerald-50 text-emerald-800",
  skill: "bg-violet-50 text-violet-800",
  hardware: "bg-rose-50 text-rose-800",
};

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return (
    <span className={`inline-block font-medium text-sm px-1.5 py-0.5 ${badgeStyles[variant]}`}>
      {children}
    </span>
  );
}

const highlights = [
  <>
    designed and built autonomous mobile robots for competitive robotics, ranking{" "}
    <Badge variant="achievement">top 10% nationally</Badge>
  </>,
  <>
    developed embedded firmware for a{" "}
    <Badge variant="technical">6-DOF robotic arm</Badge> with real-time sensor
    fusion and PID control
  </>,
  <>
    interned at <Badge variant="company">Automation Corp</Badge> building
    industrial control systems and PLC programming
  </>,
  <>
    built a <Badge variant="skill">computer vision pipeline</Badge> for object
    detection and path planning using ROS2
  </>,
  <>
    designed custom <Badge variant="hardware">PCBs</Badge> for motor drivers and
    sensor interfaces across 4+ projects
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
            <div className="flex flex-col gap-0.5 -mb-[1em]">
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
                <Badge variant="default">mechatronics engineering</Badge> at the{" "}
                <Badge variant="achievement">University of Waterloo</Badge>.
              </p>
              <p className="font-display text-neutral-500 leading-relaxed text-sm mt-4">
                My work sits at the intersection of{" "}
                <Badge variant="technical">mechanical design</Badge>,{" "}
                <Badge variant="skill">embedded systems</Badge>, and{" "}
                <Badge variant="hardware">robotics</Badge>. I like taking ideas from
                concept to physical prototype — from CAD and circuit design through
                firmware and integration testing.
              </p>
              <p className="font-display text-neutral-500 leading-relaxed text-sm mt-4">
                Previously at{" "}
                <Badge variant="company">Tesla</Badge>,{" "}
                <Badge variant="company">UWaterloo SIRRL</Badge>, and{" "}
                <Badge variant="company">Martinrea International</Badge>.
                Always looking for the next challenge that blends software with the physical world.
              </p>
            </div>

            {/* ── Highlights ── */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                Highlights
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
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:your@email.com"
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
                    <h3 className="font-display text-xl font-medium text-neutral-900">
                      {entry.role}
                    </h3>
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
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-neutral-900 border-2 border-neutral-900 px-5 py-3 hover:bg-neutral-900 hover:text-white transition-all duration-200 tracking-widest uppercase"
          >
            LinkedIn &rarr;
          </a>
          <a
            href="mailto:your@email.com"
            className="font-mono text-xs text-neutral-900 border-2 border-neutral-900 px-5 py-3 hover:bg-neutral-900 hover:text-white transition-all duration-200 tracking-widest uppercase"
          >
            Email &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}
