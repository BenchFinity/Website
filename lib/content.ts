import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { z } from "zod";

const blogDirectory = path.join(process.cwd(), "content/blog");

const blogFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  pillar: z.enum([
    "build-in-public",
    "model-railroad-systemization",
    "orchestration-education",
    "oss-methodology",
    "vertical-proof",
  ]),
  date: z.iso.date(),
  funnelStage: z.enum(["adoption", "contribution", "reputation"]),
  draft: z.boolean().default(false),
});

export type BlogPost = z.infer<typeof blogFrontmatterSchema> & {
  slug: string;
  body: string;
};

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => fileName.replace(/\.mdx$/, ""));
}

export const getBlogPost = cache((slug: string): BlogPost | null => {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const file = fs.readFileSync(filePath, "utf8");
  const parsed = matter(file);
  const result = blogFrontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    console.warn(
      `Skipping blog post "${slug}.mdx": invalid frontmatter. ${z.prettifyError(result.error)}`,
    );
    return null;
  }

  return {
    ...result.data,
    slug,
    body: parsed.content,
  };
});

export function getBlogPosts(): BlogPost[] {
  return getBlogSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => !post.draft)
    .sort((left, right) => right.date.localeCompare(left.date));
}
