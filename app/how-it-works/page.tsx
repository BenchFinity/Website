import { CtaRow } from "@/components/cta-row";
import { HonestState } from "@/components/honest-state";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "How it works",
  description:
    "How Benchfinity systemizes a Gridfinity collection, with shipped baseplate generation separated from the orchestration roadmap.",
  path: "/how-it-works",
});

const steps = [
  {
    title: "Capture",
    status: "roadmap",
    body: "The planned workflow starts with a collection: tools, rolling stock, SMD parts, or Packout loadout captured by photo, scan, or measurement.",
  },
  {
    title: "Systemize",
    status: "roadmap",
    body: "Benchfinity turns that input into a coordinated workspace system. This is the orchestration layer: bins, dividers, trays, labels, and baseplates working from one plan.",
  },
  {
    title: "Generate",
    status: "live",
    body: "Workbench already generates Gridfinity-compatible baseplates in the browser, with STL, split ZIP, and Bambu Studio-style 3MF export.",
  },
  {
    title: "Print",
    status: "live",
    body: "The output is print-ready for your printer or a maker service. The generated designs are yours to use, share, sell, or print.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <main className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="How it works"
          title="Systemize your collection."
          description="Benchfinity separates what ships today from the orchestration roadmap. The shipped Workbench generator is the baseplate foundation; the system layer is being built in the open."
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-10 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <article
              key={step.title}
              className="border-bf-border bg-bf-surface border p-6"
            >
              <StatusPill tone={step.status === "live" ? "live" : "roadmap"}>
                {step.status === "live" ? "Live today" : "Roadmap"}
              </StatusPill>
              <h2 className="mt-5 text-2xl font-semibold">{step.title}</h2>
              <p className="text-bf-text-muted mt-4 leading-7">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <HonestState />

      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 lg:px-12">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          The roadmap is the moat, not a present-tense claim.
        </h2>
        <p className="text-bf-text-muted mx-auto mt-5 max-w-2xl leading-7">
          Every page keeps this distinction visible. Baseplate generation is
          live. Accounts, collection capture, tool tracing, and whole-system
          generation are labeled roadmap until they ship.
        </p>
        <div className="mt-8">
          <CtaRow align="center" includeExamples />
        </div>
      </section>
    </main>
  );
}
