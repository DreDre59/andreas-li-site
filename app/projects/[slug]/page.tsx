import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import ProjectImage from "@/components/mdx/ProjectImage";
import VideoEmbed from "@/components/mdx/VideoEmbed";
import Callout from "@/components/mdx/Callout";

const components = { ProjectImage, VideoEmbed, Callout };

interface Props {
  params: Promise<{ slug: string }>;
}

function getProjectData(slug: string) {
  const filePath = path.join(process.cwd(), "content", "projects", slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content, readingTime: readingTime(content).text };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "projects");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => fs.statSync(path.join(dir, f)).isDirectory())
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getProjectData(slug);
  if (!data) return {};
  return {
    title: data.frontmatter.title as string,
    description: data.frontmatter.description as string,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const data = getProjectData(slug);
  if (!data) notFound();

  const { content: source, frontmatter, readingTime: rt } = data!;

  const { content } = await compileMDX({
    source,
    components,
    options: { parseFrontmatter: false },
  });

  const tags: string[] = (frontmatter.tags as string[]) ?? [];

  return (
    <article>
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </Link>

      <header className="mb-10">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          {frontmatter.date as string} · {rt}
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          {frontmatter.title as string}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-4">
          {frontmatter.description as string}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed">
        {content}
      </div>
    </article>
  );
}
