import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: MetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle =
    title === siteConfig.title ? title : `${title} | Benchfinity`;

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      images: [
        {
          url: absoluteUrl("/og-1200x630.png"),
          width: 1200,
          height: 630,
          alt: "Benchfinity baseplate field with the Benchfinity mark.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [absoluteUrl("/og-1200x630.png")],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}
