import Image from "next/image";
import Link from "next/link";
import { CtaRow } from "@/components/cta-row";
import { HonestState } from "@/components/honest-state";
import { StatusPill } from "@/components/status-pill";
import { siteConfig } from "@/lib/site";
import { featuredUseCases } from "@/lib/use-cases";

const workflow = [
  ["Capture", "Photo, scan, or measurement is the planned collection input."],
  ["Systemize", "Benchfinity turns the collection into a coordinated plan."],
  ["Generate", "Today, Workbench generates the baseplate foundation."],
  ["Print", "Export print-ready files for your own printer or maker service."],
] as const;

export default function Home() {
  return (
    <main className="bg-bf-bg text-bf-text overflow-hidden">
      <section className="relative isolate">
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: "url('/media/wallpapers/baseplate-1920x1080.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
          <div>
            <p className="border-bf-border bg-bf-surface text-bf-accent-bright mb-6 inline-flex border px-3 py-1 font-mono text-xs uppercase">
              Everything Gridfinity, in one place — not one more one-off
              generator.
            </p>
            <h1 className="text-bf-text max-w-3xl text-5xl leading-none font-semibold sm:text-6xl lg:text-7xl">
              Build your workspace system.
            </h1>
            <p className="text-bf-text-muted mt-8 max-w-2xl text-lg leading-8 sm:text-xl sm:leading-9">
              {siteConfig.description}
            </p>
            <p className="text-bf-text-muted mt-4 max-w-2xl text-sm leading-6">
              Workbench ships the baseplate foundation today. Accounts,
              collection capture, bins, dividers, foam, wall mounts, and
              whole-system generation stay labeled roadmap until they ship.
            </p>
            <div className="mt-10">
              <CtaRow includeExamples />
            </div>
          </div>
          <div className="border-bf-border bg-bf-surface/80 relative border p-3">
            <Image
              src="/media/mockups/browser-hero.png"
              alt="Benchfinity Workbench baseplate generator in a browser frame"
              width={1160}
              height={760}
              priority
              className="border-bf-border border"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <StatusPill tone="neutral">Problem</StatusPill>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
              A collection should not become a pile of separate generators.
            </h2>
          </div>
          <div className="text-bf-text-muted space-y-5 text-lg leading-8">
            <p>
              The Gridfinity ecosystem is rich, but the workflow is fragmented.
              One tool generates a baseplate, another handles bins, another
              handles dividers, and the larger collection still lives in your
              head.
            </p>
            <p>
              Benchfinity starts with the foundation that exists today:
              deterministic, browser-based baseplate generation. The larger goal
              is collection orchestration: one collection in, a complete system
              out.
            </p>
          </div>
        </div>
      </section>

      <HonestState />

      <section className="border-bf-border bg-bf-surface/50 border-y">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid gap-4 md:grid-cols-4">
            {workflow.map(([label, text]) => (
              <article
                key={label}
                className="border-bf-border bg-bf-bg border p-5"
              >
                <h2 className="text-bf-accent-bright font-mono text-sm">
                  {label}
                </h2>
                <p className="text-bf-text-muted mt-4 text-sm leading-6">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <StatusPill tone="roadmap">Systemize your collection</StatusPill>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Start with the use cases where fit matters.
            </h2>
          </div>
          <Link
            className="text-bf-accent-bright text-sm font-semibold underline"
            href="/use-cases"
          >
            View all use cases
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredUseCases.map((useCase) => (
            <Link
              key={useCase.slug}
              className="border-bf-border bg-bf-surface hover:border-bf-accent block border p-6 transition"
              href={`/use-cases/${useCase.slug}`}
            >
              <p className="text-bf-accent-bright font-mono text-sm uppercase">
                {useCase.eyebrow}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{useCase.title}</h3>
              <p className="text-bf-text-muted mt-4 text-sm leading-6">
                {useCase.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-bf-border border-t">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div>
            <StatusPill tone="live">Open source</StatusPill>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Free, open, and built where contributors can see it.
            </h2>
          </div>
          <div>
            <p className="text-bf-text-muted text-lg leading-8">
              Workbench ships AGPL-3.0 and intends to stay that way. The designs
              you generate are yours to use, share, sell, or print.
            </p>
            <Link
              className="text-bf-accent-bright mt-6 inline-flex text-sm font-semibold underline"
              href="/open-source"
            >
              Read the open source page
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 lg:px-12">
        <StatusPill tone="neutral">Always free</StatusPill>
        <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
          Build now. Join the roadmap when you are ready.
        </h2>
        <p className="text-bf-text-muted mx-auto mt-5 max-w-2xl leading-7">
          The first CTA goes to the live browser generator. The second keeps its
          account wording, then routes to notification and community until
          accounts ship.
        </p>
        <div className="mt-8">
          <CtaRow align="center" />
        </div>
      </section>
    </main>
  );
}
