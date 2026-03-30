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

const tagPalette = [
  "bg-sky-50 text-sky-800",
  "bg-amber-50 text-amber-800",
  "bg-violet-50 text-violet-800",
  "bg-emerald-50 text-emerald-800",
  "bg-rose-50 text-rose-800",
];

function assignTagColors(tags: string[]) {
  // Shuffle palette deterministically using first tag's hash as seed
  let seed = 0;
  for (const ch of (tags[0] ?? "")) seed = (seed * 31 + ch.charCodeAt(0)) | 0;
  const shuffled = [...tagPalette];
  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 16807 + 0) | 0;
    const j = Math.abs(seed) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Assign colors cycling through the shuffled palette
  return tags.map((_, i) => shuffled[i % shuffled.length]);
}

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
        <h1 className="font-display font-extrabold uppercase tracking-tight text-5xl text-neutral-900 leading-none mt-6 mb-6">
          {frontmatter.title as string}
        </h1>
        <p className="font-display text-sm text-neutral-500 leading-relaxed mb-6">
          {frontmatter.description as string}
        </p>
        <div className="flex flex-wrap gap-2">
          {(() => {
            const colors = assignTagColors(tags);
            return tags.map((tag, i) => (
              <span
                key={tag}
                className={`font-mono text-xs font-medium px-2.5 py-1 ${colors[i]}`}
              >
                {tag}
              </span>
            ));
          })()}
        </div>
      </header>

      <div className="border-t border-neutral-100 mb-12" />

      <div className="prose prose-neutral max-w-none font-display text-sm text-neutral-500 leading-relaxed prose-headings:font-display prose-headings:font-extrabold prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-neutral-900 prose-h2:text-xl prose-h2:mt-24 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-20 prose-h3:mb-3 prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-2 prose-strong:text-neutral-900 prose-code:font-mono prose-code:text-xs prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-img:rounded-none">
        {content}
      </div>
    </article>
  );
}
