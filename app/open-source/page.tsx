import { CtaRow } from "@/components/cta-row";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { TrackedLink } from "@/components/tracked-link";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Open Source",
  description:
    "Benchfinity is free and open source, ships AGPL-3.0, and gives users full rights to their generated designs.",
  path: "/open-source",
});

const contributionSteps = [
  "Use Workbench and print a real part.",
  "Report fit data, a bug, or a feature request.",
  "Publish a model or workflow that another builder can use.",
  "Open a pull request after accepting the one-time CLA.",
] as const;

export default function OpenSourcePage() {
  return (
    <main className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="Open source"
          title="Free and open source."
          description="Benchfinity uses this surface for the contributor lane. Use it, inspect it, publish with it, and help build the next vertical."
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 sm:px-8 lg:grid-cols-3 lg:px-12">
        <article className="border-bf-border bg-bf-surface border p-6">
          <StatusPill tone="live">License</StatusPill>
          <h2 className="mt-5 text-2xl font-semibold">AGPL-3.0</h2>
          <p className="text-bf-text-muted mt-4 leading-7">
            Workbench ships AGPL-3.0 and intends to stay that way. The license
            covers the software, not the ordinary output you generate with it.
          </p>
        </article>
        <article className="border-bf-border bg-bf-surface border p-6">
          <StatusPill tone="live">Output rights</StatusPill>
          <h2 className="mt-5 text-2xl font-semibold">
            Your generated designs are yours.
          </h2>
          <p className="text-bf-text-muted mt-4 leading-7">
            The designs you generate are yours to use, share, sell, or print.
          </p>
        </article>
        <article className="border-bf-border bg-bf-surface border p-6">
          <StatusPill tone="neutral">Contributions</StatusPill>
          <h2 className="mt-5 text-2xl font-semibold">One-time CLA</h2>
          <p className="text-bf-text-muted mt-4 leading-7">
            Contributors keep copyright and grant Benchfinity clean rights to
            use and relicense contributions. The bot handles this on the first
            pull request.
          </p>
        </article>
      </section>

      <section className="border-bf-border bg-bf-surface/40 border-y">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div>
            <StatusPill tone="neutral">Contributor lane</StatusPill>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
              The ladder is use, react, report, publish, build.
            </h2>
          </div>
          <div className="grid gap-3">
            {contributionSteps.map((step, index) => (
              <div
                key={step}
                className="border-bf-border bg-bf-bg flex gap-4 border p-4"
              >
                <span className="text-bf-accent-bright font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-bf-text-muted leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <TrackedLink
            className="border-bf-border bg-bf-surface hover:border-bf-accent block border p-5 transition"
            href={siteConfig.links.workbench}
            eventProperties={{ destination: "workbench_repo" }}
          >
            <p className="text-bf-accent-bright font-mono text-sm uppercase">
              Repo
            </p>
            <h2 className="mt-4 text-xl font-semibold">Workbench</h2>
          </TrackedLink>
          <TrackedLink
            className="border-bf-border bg-bf-surface hover:border-bf-accent block border p-5 transition"
            href={siteConfig.links.contributing}
            eventProperties={{ destination: "contributing" }}
          >
            <p className="text-bf-accent-bright font-mono text-sm uppercase">
              Guide
            </p>
            <h2 className="mt-4 text-xl font-semibold">Contributing</h2>
          </TrackedLink>
          <TrackedLink
            className="border-bf-border bg-bf-surface hover:border-bf-accent block border p-5 transition"
            href={siteConfig.links.goodFirstIssues}
            eventProperties={{ destination: "good_first_issues" }}
          >
            <p className="text-bf-accent-bright font-mono text-sm uppercase">
              Queue
            </p>
            <h2 className="mt-4 text-xl font-semibold">Good first issues</h2>
          </TrackedLink>
          <TrackedLink
            className="border-bf-border bg-bf-surface hover:border-bf-accent block border p-5 transition"
            href={siteConfig.links.roadmap}
            eventProperties={{ destination: "roadmap" }}
          >
            <p className="text-bf-accent-bright font-mono text-sm uppercase">
              Plan
            </p>
            <h2 className="mt-4 text-xl font-semibold">Roadmap</h2>
          </TrackedLink>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 text-center sm:px-8 lg:px-12">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Build with it first.
        </h2>
        <p className="text-bf-text-muted mx-auto mt-5 max-w-2xl leading-7">
          Contribution starts with a printed part, a fit report, or a clear bug.
          Code is one path, not the only path.
        </p>
        <div className="mt-8">
          <CtaRow align="center" />
        </div>
      </section>
    </main>
  );
}
