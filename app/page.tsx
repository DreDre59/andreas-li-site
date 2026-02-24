import { Github, Linkedin, Mail, FileDown, ExternalLink } from "lucide-react";

const highlights = [
  {
    text: "Built a ",
    link: null,
    keyword: null,
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section>
        <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
          About
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
          Hi, I&apos;m <span className="text-blue-500 dark:text-blue-400">Your Name</span>.
        </h1>
        <div className="space-y-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p>
            I&apos;m a mechatronics and robotics engineer who builds systems where
            software meets the physical world — from embedded firmware to full
            robot stacks.
          </p>
          <p>
            Currently studying at [Your University], I spend my time designing
            PCBs, writing ROS2 pipelines, and occasionally arguing with
            stepper motor drivers at 2am.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
          Highlights
        </h2>
        <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
          {[
            <>
              Interned at{" "}
              <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-1 rounded font-medium">
                Company Name
              </span>{" "}
              building autonomous inspection systems using{" "}
              <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-1 rounded font-medium">
                ROS2
              </span>{" "}
              and computer vision.
            </>,
            <>
              Designed and manufactured a{" "}
              <span className="bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-1 rounded font-medium">
                4-layer PCB
              </span>{" "}
              motor controller from schematic to assembly.
            </>,
            <>
              Led a team of 5 building a competition robot for{" "}
              <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-1 rounded font-medium">
                [Competition Name]
              </span>.
            </>,
            <>
              Proficient in{" "}
              <span className="bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 px-1 rounded font-medium">
                C/C++
              </span>
              ,{" "}
              <span className="bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 px-1 rounded font-medium">
                Python
              </span>
              , SolidWorks, MATLAB, and the dark arts of linker scripts.
            </>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Social links + CTA */}
      <section className="flex flex-wrap items-center gap-3">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <Github size={15} />
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <Linkedin size={15} />
          LinkedIn
        </a>
        <a
          href="mailto:your@email.com"
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <Mail size={15} />
          Email
        </a>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors font-medium"
        >
          <FileDown size={15} />
          Download Resume
        </a>
      </section>
    </div>
  );
}
