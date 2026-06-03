import { Card } from "@/components/card";
import { ClosingCta } from "@/components/closing-cta";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Examples and Models",
  description:
    "Published Benchfinity examples, model slots, and distribution surfaces for Printables, MakerWorld, YouTube, and niche communities.",
  path: "/examples",
  noIndex: true,
});

const exampleSlots = [
  {
    title: "HO rolling-stock tray",
    status: "Model pending",
    body: "First beachhead model slot. The real upload should show measured fit, print settings, and a baseplate-mounted tray for a specific HO car length.",
  },
  {
    title: "Model railroad parts drawer",
    status: "Workflow pending",
    body: "Before and after drawer workflow for detail parts, rolling stock, labels, and visible retrieval. This becomes the tutorial anchor once photographed.",
  },
  {
    title: "Packout bridge baseplate",
    status: "Expansion pending",
    body: "A Gridfinity-standard baseplate dimensioned to seat in a Packout organizer. The page is ready for the real model link when it exists.",
  },
  {
    title: "Electronics SMD tray",
    status: "Expansion pending",
    body: "SMD strips, reel storage, and IC-tube rack examples belong here once the physical models are printed and verified.",
  },
] as const;

const surfaces = [
  "Printables and MakerWorld model pages",
  "YouTube workflow videos",
  "Relevant subreddit posts",
  "Use-case pages with measured fit notes",
] as const;

export default function ExamplesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="Examples and models"
          title="Preview: the models are the marketing."
          description="This surface is intentionally noindex until real published models exist. It does not fake Printables, MakerWorld, YouTube, or community links before those artifacts are live."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-2">
          {exampleSlots.map((slot) => (
            <Card key={slot.title}>
              <StatusPill tone="roadmap">{slot.status}</StatusPill>
              <h2 className="mt-5 text-2xl font-semibold">{slot.title}</h2>
              <p className="text-bf-text-muted mt-4 leading-7">{slot.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-bf-border bg-bf-surface/40 border-y">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
          <div>
            <StatusPill tone="neutral">Distribution</StatusPill>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Each model gets a channel-native proof chain.
            </h2>
          </div>
          <div className="grid gap-3">
            {surfaces.map((surface) => (
              <div
                key={surface}
                className="border-bf-border bg-bf-bg text-bf-text-muted border p-4"
              >
                {surface}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        heading="Start from a baseplate while the model library fills in."
        body="The examples page is part of v1 because it is the future discovery surface. The individual model links wait for real printed evidence."
      />
    </main>
  );
}
