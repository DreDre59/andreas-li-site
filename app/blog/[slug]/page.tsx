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

function getBlogData(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", slug, "index.mdx");
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content, readingTime: readingTime(content).text };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => fs.statSync(path.join(dir, f)).isDirectory())
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getBlogData(slug);
  if (!data) return {};
  return {
    title: data.frontmatter.title as string,
    description: data.frontmatter.description as string,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = getBlogData(slug);
  if (!data) notFound();

  const { content: source, frontmatter, readingTime: rt } = data!;

  const { content } = await compileMDX({
    source,
    components,
    options: { parseFrontmatter: false },
  });

  const tags: string[] = (frontmatter.tags as string[]) ?? [];

  return (
    <article className="py-20 px-8 max-w-7xl mx-auto">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        Back to Blog
      </Link>

      <header className="mb-14 max-w-2xl">
        <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
          {frontmatter.date as string} · {rt}
        </span>
        <h1 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none mt-4 mb-4">
          {frontmatter.title as string}
        </h1>
        <p className="font-display text-neutral-500 text-sm leading-relaxed mb-4">
          {frontmatter.description as string}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-neutral-500 border border-neutral-200 px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-neutral max-w-2xl text-sm leading-relaxed font-display">
        {content}
      </div>
    </article>
  );
}
