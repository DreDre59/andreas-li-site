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
    <article className="py-20 px-8 max-w-3xl mx-auto">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
      >
        <ArrowLeft size={12} />
        Back to Projects
      </Link>

      <header className="mt-10 mb-12">
        <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
          {frontmatter.date as string} — {rt}
        </span>
        <h1 className="font-display font-extrabold uppercase tracking-tight text-4xl text-neutral-900 leading-none mt-3 mb-4">
          {frontmatter.title as string}
        </h1>
        <p className="font-display text-sm text-neutral-500 leading-relaxed mb-6">
          {frontmatter.description as string}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="border-t border-neutral-100 mb-12" />

      <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-extrabold prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-xl prose-h3:text-lg prose-p:font-display prose-p:text-sm prose-p:text-neutral-500 prose-p:leading-relaxed prose-li:font-display prose-li:text-sm prose-li:text-neutral-500 prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-2 prose-strong:text-neutral-900 prose-code:font-mono prose-code:text-xs prose-img:rounded-none">
        {content}
      </div>
    </article>
  );
}
