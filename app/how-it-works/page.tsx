import { Card } from "@/components/card";
import { ClosingCta } from "@/components/closing-cta";
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
    statusLabel: "Roadmap",
    body: "The planned workflow starts with a collection: tools, rolling stock, SMD parts, or Packout loadout captured by photo, scan, or measurement.",
  },
  {
    title: "Systemize",
    status: "roadmap",
    statusLabel: "Roadmap",
    body: "Benchfinity turns that input into a coordinated workspace system. This is the orchestration layer: bins, dividers, trays, labels, and baseplates working from one plan.",
  },
  {
    title: "Generate",
    status: "live",
    statusLabel: "Live today",
    body: "Workbench already generates Gridfinity-compatible baseplates in the browser, with STL, split ZIP, and Bambu Studio-style 3MF export.",
  },
  {
    title: "Print",
    status: "live",
    statusLabel: "Live today",
    body: "The output is print-ready for your printer or a maker service. The generated designs are yours to use, share, sell, or print.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-bf-bg text-bf-text">
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
            <Card key={step.title}>
              <StatusPill tone={step.status}>{step.statusLabel}</StatusPill>
              <h2 className="mt-5 text-2xl font-semibold">{step.title}</h2>
              <p className="text-bf-text-muted mt-4 leading-7">{step.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <HonestState />

      <ClosingCta
        heading="The roadmap is the moat, not a present-tense claim."
        body="Every page keeps this distinction visible. Baseplate generation is live. Accounts, collection capture, tool tracing, and whole-system generation are labeled roadmap until they ship."
        includeExamples
      />
    </main>
  );
}
