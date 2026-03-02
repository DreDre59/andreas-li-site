import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on robotics, embedded systems, and engineering lessons learned.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-20 px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-14">
        <h1 className="font-display font-extrabold uppercase text-neutral-900 tracking-tight text-5xl leading-none">
          Writing
        </h1>
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 pb-1">
          {String(posts.length).padStart(2, "0")} posts
        </span>
      </div>

      <p className="font-display text-neutral-400 text-sm max-w-md leading-relaxed mb-10">
        Notes on things I&apos;ve learned, built, or broken.
      </p>

      {posts.length === 0 ? (
        <p className="font-display text-neutral-400 text-sm">
          No posts yet — check back soon.
        </p>
      ) : (
        <div className="max-w-2xl divide-y divide-neutral-100">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-6 hover:no-underline"
            >
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                {post.date} · {post.readingTime}
              </span>
              <h2 className="font-display text-xl font-medium text-neutral-900 mt-2 group-hover:text-neutral-600 transition-colors">
                {post.title}
              </h2>
              <p className="font-display text-sm text-neutral-500 mt-2 leading-relaxed max-w-lg">
                {post.description}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-neutral-500 border border-neutral-200 px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
