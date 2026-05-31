import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { featuredUseCases } from "@/lib/use-cases";

const staticRoutes = [
  "/",
  "/how-it-works",
  "/use-cases",
  "/open-source",
  "/blog",
  "/faq",
  "/privacy",
  "/cookies",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const blogEntries = getBlogPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, siteConfig.url).toString(),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const useCaseEntries = featuredUseCases.map((useCase) => ({
    url: new URL(`/use-cases/${useCase.slug}`, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...useCaseEntries, ...blogEntries];
}
