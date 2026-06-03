import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getBlogPost, getBlogSlugs } from "@/lib/content";
import { absoluteUrl, createPageMetadata } from "@/lib/metadata";
import { mdxComponents, mdxOptions } from "@/lib/mdx";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = absoluteUrl(`/blog/${slug}`);
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.description,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="bg-bf-bg text-bf-text min-h-screen px-6 py-16 sm:px-8 lg:px-12"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <article className="mx-auto max-w-3xl">
        <Link className="text-bf-accent-bright font-mono text-sm" href="/">
          Benchfinity
        </Link>
        <p className="text-bf-text-muted mt-10 font-mono text-sm">
          {post.date}
        </p>
        <h1 className="mt-4 text-5xl font-semibold">{post.title}</h1>
        <p className="text-bf-text-muted mt-6 text-lg leading-8">
          {post.description}
        </p>
        <div className="border-bf-border mt-10 border-t pt-8">
          <MDXRemote
            source={post.body}
            components={mdxComponents}
            options={mdxOptions}
          />
        </div>
      </article>
    </main>
  );
}
