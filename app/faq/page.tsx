import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Benchfinity FAQ covering free use, licensing, output rights, analytics, honest-state, and Gridfinity compatibility.",
  path: "/faq",
});

const faqs = [
  {
    question: "Is Benchfinity really free?",
    answer:
      "Yes. Benchfinity is a free, open-source project. Workbench runs in the browser, needs no account, and nothing is for sale on the site.",
  },
  {
    question: "What is live today?",
    answer:
      "Workbench generates Gridfinity-compatible baseplates with STL, split ZIP, and Bambu Studio-style 3MF export, printer-bed presets, auto-split, magnets, connectors, and 42 mm pitch.",
  },
  {
    question: "What is roadmap?",
    answer:
      "Accounts, collection capture, whole-system orchestration, bins, dividers, foam, wall-mounts, tool tracing, labels, and editable round-trip output are roadmap items until they ship.",
  },
  {
    question: "Can I use or sell the files I generate?",
    answer:
      "Yes. The designs you generate are yours to use, share, sell, or print. AGPL-3.0 covers the Workbench software, not the ordinary output you generate with it.",
  },
  {
    question: "Does the site track me?",
    answer:
      "Benchfinity uses self-hosted analytics with consent. The Workbench tool does not upload your generated designs. See the Privacy and Cookie policy pages for the launch posture.",
  },
  {
    question: "How does Benchfinity use Gridfinity?",
    answer:
      "Benchfinity is engineered to the Gridfinity standard and uses the name nominatively when describing compatibility.",
  },
  {
    question: "How do I contribute?",
    answer:
      "Use the tool, report fit data, publish a model, file an issue, or open a pull request. First-time code contributors accept a one-time CLA.",
  },
] as const;

export default function FaqPage() {
  return (
    <main className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="FAQ"
          title="Clear answers before the roadmap grows."
          description="Benchfinity is precise about what is live, what is planned, what is collected, and what rights users keep."
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="divide-bf-border border-bf-border divide-y border-y">
          {faqs.map((faq) => (
            <article key={faq.question} className="py-8">
              <h2 className="text-2xl font-semibold">{faq.question}</h2>
              <p className="text-bf-text-muted mt-4 leading-7">{faq.answer}</p>
            </article>
          ))}
        </div>
        <div className="text-bf-text-muted mt-10 flex flex-wrap gap-5 text-sm">
          <Link className="text-bf-accent-bright underline" href="/privacy">
            Privacy
          </Link>
          <Link className="text-bf-accent-bright underline" href="/cookies">
            Cookie Policy
          </Link>
          <Link className="text-bf-accent-bright underline" href="/open-source">
            Open Source
          </Link>
        </div>
      </section>
    </main>
  );
}
