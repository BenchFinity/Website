import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/lib/site";

type CtaRowProps = {
  align?: "left" | "center";
  includeExamples?: boolean;
};

export function CtaRow({
  align = "left",
  includeExamples = false,
}: CtaRowProps) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row ${
        align === "center" ? "items-center justify-center" : ""
      }`}
    >
      <TrackedLink
        className="border-bf-accent bg-bf-accent text-bf-bg hover:bg-bf-accent-bright inline-flex min-h-12 items-center justify-center border px-5 text-sm font-semibold transition"
        href={siteConfig.workbenchUrl}
        event="cta_clicked"
        eventProperties={{
          cta: "build_now",
          destination: siteConfig.workbenchUrl,
        }}
      >
        Build something now
      </TrackedLink>
      <TrackedLink
        className="border-bf-border bg-bf-surface text-bf-text hover:border-bf-accent hover:text-bf-accent-bright inline-flex min-h-12 items-center justify-center border px-5 text-sm font-semibold transition"
        href={siteConfig.notifyUrl}
        event="cta_clicked"
        eventProperties={{
          cta: "create_account_systems",
          destination: siteConfig.notifyUrl,
        }}
      >
        Create an account and build entire systems
      </TrackedLink>
      {includeExamples ? (
        <Link
          className="text-bf-accent-bright inline-flex min-h-12 items-center justify-center px-2 text-sm font-semibold underline"
          href="/examples"
        >
          Explore Examples
        </Link>
      ) : null}
    </div>
  );
}
