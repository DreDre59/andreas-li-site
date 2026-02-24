import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  featured?: boolean;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
  readingTime: string;
}

export interface BlogMeta extends BlogFrontmatter {
  slug: string;
  readingTime: string;
}

function getSlugs(type: "projects" | "blog"): string[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => {
    const full = path.join(dir, f);
    return fs.statSync(full).isDirectory();
  });
}

function readMDX(type: "projects" | "blog", slug: string) {
  const filePath = path.join(contentDir, type, slug, "index.mdx");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, content };
}

export function getAllProjects(): ProjectMeta[] {
  const slugs = getSlugs("projects");
  return slugs
    .map((slug) => {
      const { frontmatter, content } = readMDX("projects", slug);
      const fm = frontmatter as ProjectFrontmatter;
      return {
        ...fm,
        slug,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllBlogPosts(): BlogMeta[] {
  const slugs = getSlugs("blog");
  return slugs
    .map((slug) => {
      const { frontmatter, content } = readMDX("blog", slug);
      const fm = frontmatter as BlogFrontmatter;
      return {
        ...fm,
        slug,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectSlugs(): string[] {
  return getSlugs("projects");
}

export function getBlogSlugs(): string[] {
  return getSlugs("blog");
}
