import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaRow } from "@/components/cta-row";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { createPageMetadata } from "@/lib/metadata";
import { featuredUseCases, getUseCase } from "@/lib/use-cases";

type UseCasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featuredUseCases.map((useCase) => ({ slug: useCase.slug }));
}

export async function generateMetadata({
  params,
}: UseCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);

  if (!useCase) {
    return {};
  }

  return createPageMetadata({
    title: useCase.title,
    description: useCase.description,
    path: `/use-cases/${slug}`,
  });
}

export default async function UseCasePage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const useCase = getUseCase(slug);

  if (!useCase) {
    notFound();
  }

  return (
    <main className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow={useCase.eyebrow}
          title={useCase.title}
          description={useCase.description}
        />
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 sm:px-8 lg:grid-cols-3 lg:px-12">
        <article className="border-bf-border bg-bf-surface border p-6">
          <StatusPill tone="live">Live today</StatusPill>
          <h2 className="mt-5 text-2xl font-semibold">Baseplate foundation</h2>
          <ul className="text-bf-text-muted mt-5 space-y-3 text-sm leading-6">
            {useCase.liveToday.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="border-bf-border bg-bf-surface border p-6">
          <StatusPill tone="roadmap">Roadmap</StatusPill>
          <h2 className="mt-5 text-2xl font-semibold">Whole-system workflow</h2>
          <ul className="text-bf-text-muted mt-5 space-y-3 text-sm leading-6">
            {useCase.roadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="border-bf-border bg-bf-surface border p-6">
          <StatusPill tone="neutral">Proof needed</StatusPill>
          <h2 className="mt-5 text-2xl font-semibold">Adoption evidence</h2>
          <ul className="text-bf-text-muted mt-5 space-y-3 text-sm leading-6">
            {useCase.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="border-bf-border bg-bf-surface/40 border-y">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-semibold">Search language</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {useCase.keywords.map((keyword) => (
              <span
                key={keyword}
                className="border-bf-border bg-bf-bg text-bf-text-muted border px-3 py-2 font-mono text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8 lg:px-12">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Build the foundation today.
        </h2>
        <p className="text-bf-text-muted mx-auto mt-5 max-w-2xl leading-7">
          The use case page names the complete workflow because that is the
          direction. Workbench today gives you the Gridfinity-compatible
          baseplate it will sit on.
        </p>
        <div className="mt-8">
          <CtaRow align="center" includeExamples />
        </div>
      </section>
    </main>
  );
}
