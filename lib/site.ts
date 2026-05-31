const discordUrl = "https://discord.gg/R3sc8fWJMJ";
const privacyEmail =
  process.env.NEXT_PUBLIC_PRIVACY_EMAIL ?? "privacy@benchfinity.com";

export const siteConfig = {
  name: "Benchfinity",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://benchfinity.com",
  title: "Benchfinity — Build Your Whole Gridfinity Workspace System",
  description:
    "The open, unified platform for Gridfinity-standard generation — turn a whole collection into one coordinated workspace system. Free & open source.",
  privacyEmail,
  workbenchUrl:
    process.env.NEXT_PUBLIC_WORKBENCH_URL ??
    "https://workbench.benchfinity.com",
  notifyUrl: process.env.NEXT_PUBLIC_NOTIFY_URL ?? discordUrl,
  links: {
    github: "https://github.com/BenchFinity",
    workbench: "https://github.com/BenchFinity/Workbench",
    company: "https://github.com/BenchFinity/company",
    methodology:
      "https://github.com/BenchFinity/company/blob/develop/TEMPLATE.md",
    contributing:
      "https://github.com/BenchFinity/Workbench/blob/develop/CONTRIBUTING.md",
    goodFirstIssues:
      "https://github.com/BenchFinity/Workbench/issues?q=is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22",
    roadmap: "https://github.com/BenchFinity/company/blob/develop/ROADMAP.md",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL ?? discordUrl,
    sponsor: process.env.NEXT_PUBLIC_SPONSOR_URL ?? null,
  },
} as const;

export const primaryNavigation = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/examples", label: "Examples" },
  { href: "/open-source", label: "Open Source" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
] as const;

export const footerNavigation = [
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;
