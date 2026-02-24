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
    <div>
      <p className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-4">
        Blog
      </p>
      <h1 className="text-3xl font-bold tracking-tight mb-2">Writing</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-10">
        Notes on things I&apos;ve learned, built, or broken.
      </p>

      {posts.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          No posts yet — check back soon.
        </p>
      ) : (
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-6 hover:no-underline"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h2 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                  {post.date} · {post.readingTime}
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
