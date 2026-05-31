import { ConsentSettingsButton } from "@/components/consent-settings-button";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Benchfinity cookie categories, consent behavior, analytics posture, and user controls.",
  path: "/cookies",
});

const cookieCategories = [
  {
    title: "Necessary",
    status: "Always on",
    body: "Used for core site behavior and consent storage. These do not measure adoption.",
  },
  {
    title: "Analytics",
    status: "Optional",
    body: "Used for page views, sessions, CTA clicks, and adoption funnels after consent. Reject prevents analytics from loading.",
  },
  {
    title: "Marketing",
    status: "Not active",
    body: "No marketing or retargeting cookies are active in this build. Add a separate disclosure before enabling any campaign tooling.",
  },
] as const;

export default function CookiesPage() {
  return (
    <main className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="Cookie policy"
          title="Reject genuinely works."
          description="Benchfinity ships with a consent surface from v1 because analytics are part of the launch posture. The controls must stay plain and reversible."
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <ConsentSettingsButton className="border-bf-border bg-bf-surface text-bf-text hover:border-bf-accent inline-flex min-h-11 items-center justify-center border px-4 text-sm font-semibold transition" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {cookieCategories.map((category) => (
            <article
              key={category.title}
              className="border-bf-border bg-bf-surface border p-6"
            >
              <StatusPill tone="neutral">{category.status}</StatusPill>
              <h2 className="mt-5 text-2xl font-semibold">{category.title}</h2>
              <p className="text-bf-text-muted mt-4 leading-7">
                {category.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
