import { StatusPill } from "@/components/status-pill";

export function HonestState() {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:px-8 md:grid-cols-2 lg:px-12">
      <article className="border-bf-border bg-bf-surface border p-6">
        <StatusPill tone="live">Live today</StatusPill>
        <h2 className="text-bf-text mt-5 text-2xl font-semibold">
          Gridfinity-compatible baseplates
        </h2>
        <p className="text-bf-text-muted mt-4 leading-7">
          Workbench runs in the browser, needs no account, and exports STL,
          split ZIP, and Bambu Studio-style 3MF files. It supports printer-bed
          presets, auto-split, magnets, connectors, and the 42 mm pitch.
        </p>
      </article>
      <article className="border-bf-border bg-bf-surface border p-6">
        <StatusPill tone="roadmap">Roadmap</StatusPill>
        <h2 className="text-bf-text mt-5 text-2xl font-semibold">
          Whole-collection orchestration
        </h2>
        <p className="text-bf-text-muted mt-4 leading-7">
          Accounts, collection capture, coordinated bins, dividers, foam,
          wall-mounts, tool tracing, and whole-system generation are being built
          in the open. They are not present-tense claims.
        </p>
      </article>
    </section>
  );
}
