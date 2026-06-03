import { LinkCard } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { createPageMetadata } from "@/lib/metadata";
import { expansionUseCases, featuredUseCases } from "@/lib/use-cases";

export const metadata = createPageMetadata({
  title: "Use Cases",
  description:
    "Benchfinity use cases for Gridfinity model railroad storage, toolbox buildouts, tool tracing, electronics, and Packout bridge workflows.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="Use cases"
          title="Collections where fit matters."
          description="The site leads with model railroad storage, toolbox buildouts, and tool tracing because each one depends on measured fit, repeatable layouts, and clear honest-state boundaries."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredUseCases.map((useCase) => (
            <LinkCard key={useCase.slug} href={`/use-cases/${useCase.slug}`}>
              <StatusPill tone="roadmap">{useCase.statusLabel}</StatusPill>
              <p className="text-bf-accent-bright mt-6 font-mono text-sm uppercase">
                {useCase.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-semibold">{useCase.title}</h2>
              <p className="text-bf-text-muted mt-4 leading-7">
                {useCase.description}
              </p>
            </LinkCard>
          ))}
        </div>
      </section>

      <section className="border-bf-border bg-bf-surface/40 border-t">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <StatusPill tone="neutral">Expansion index</StatusPill>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">
              Breadth comes after proof.
            </h2>
            <p className="text-bf-text-muted mt-5 leading-7">
              Additional verticals stay index-level until Benchfinity has real
              models, workflow evidence, and enough content for a dedicated
              page.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {expansionUseCases.map((useCase) => (
              <article
                key={useCase.title}
                className="border-bf-border bg-bf-bg border p-6"
              >
                <h3 className="text-xl font-semibold">{useCase.title}</h3>
                <p className="text-bf-text-muted mt-4 text-sm leading-6">
                  {useCase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
