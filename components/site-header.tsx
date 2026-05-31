import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { primaryNavigation, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-bf-border bg-bf-bg/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <Link
          className="inline-flex items-center"
          href="/"
          aria-label="Benchfinity home"
        >
          <Image
            src="/brand/logos/benchfinity-lockup-notagline-outlined.svg"
            alt="Benchfinity"
            width={214}
            height={46}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <nav
          aria-label="Primary"
          className="text-bf-text-muted flex flex-wrap items-center gap-x-5 gap-y-3 text-sm"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              className="hover:text-bf-accent-bright"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <TrackedLink
            className="border-bf-border bg-bf-surface text-bf-text hover:border-bf-accent hover:text-bf-accent-bright inline-flex min-h-10 items-center justify-center border px-4 font-semibold transition"
            href={siteConfig.workbenchUrl}
            event="cta_clicked"
            eventProperties={{
              cta: "nav_build",
              destination: siteConfig.workbenchUrl,
            }}
          >
            Build
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}
