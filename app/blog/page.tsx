import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { getBlogPosts } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Benchfinity build-in-public devlog, model railroad systemization, orchestration education, OSS methodology, and vertical proof posts.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <main className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="Blog"
          title="Build notes and field evidence."
          description="The blog is the canonical written record for shipped Workbench changes, roadmap decisions, model-railroad proof, orchestration education, and contribution method."
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="border-bf-border bg-bf-surface hover:border-bf-accent block border p-6 transition"
              href={`/blog/${post.slug}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill tone="neutral">{post.pillar}</StatusPill>
                <span className="text-bf-text-muted font-mono text-sm">
                  {post.date}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{post.title}</h2>
              <p className="text-bf-text-muted mt-4 leading-7">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
