import type { Metadata } from "next";
import { getAllProjects } from "@/lib/mdx";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Technical projects in robotics, embedded systems, and more.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
        Projects
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Things I&apos;ve Built
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-10">
        A mix of robotics, embedded systems, and software projects.
      </p>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
