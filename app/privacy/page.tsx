import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Benchfinity privacy posture for self-hosted analytics, consent, server logs, email opt-in, and client-side generated designs.",
  path: "/privacy",
});

const dataRows = [
  [
    "Web analytics",
    "Collected with consent for page views, sessions, events, referrers, device data, and approximate geography.",
  ],
  [
    "Cookies",
    "Necessary cookies keep the site working. Analytics cookies are optional and controlled by the consent banner.",
  ],
  [
    "Generated designs",
    "Not uploaded by the website. Workbench generation happens client-side.",
  ],
  ["Accounts", "Not collected in v1 because accounts are roadmap."],
  ["Payment data", "Not collected because nothing is for sale."],
  [
    "Email opt-in",
    "Not collected by this site until an email capture destination is configured. If enabled later, it is used only for Benchfinity updates.",
  ],
  ["Server logs", "Standard request logs with short retention."],
] as const;

export default function PrivacyPage() {
  return (
    <main className="bg-bf-bg text-bf-text">
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <PageHeader
          eyebrow="Privacy"
          title="Measured honestly, with consent."
          description="Benchfinity uses self-hosted analytics to understand adoption. The policy is explicit because the site measures the funnel instead of pretending it does not."
        />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-4">
          {dataRows.map(([label, detail]) => (
            <article
              key={label}
              className="border-bf-border bg-bf-surface grid gap-4 border p-5 md:grid-cols-[12rem_1fr]"
            >
              <h2 className="text-bf-text font-mono text-sm uppercase">
                {label}
              </h2>
              <p className="text-bf-text-muted leading-7">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-bf-border bg-bf-surface/40 border-y">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:px-8 md:grid-cols-2 lg:px-12">
          <article>
            <StatusPill tone="neutral">Processor</StatusPill>
            <h2 className="mt-5 text-2xl font-semibold">Self-hosted PostHog</h2>
            <p className="text-bf-text-muted mt-4 leading-7">
              The intended analytics stack is self-hosted PostHog, not Google
              Analytics. The endpoint and project key are founder prerequisites
              and are not committed to the repository.
            </p>
          </article>
          <article>
            <StatusPill tone="neutral">Rights</StatusPill>
            <h2 className="mt-5 text-2xl font-semibold">
              Access, delete, opt out
            </h2>
            <p className="text-bf-text-muted mt-4 leading-7">
              You can reject analytics from the banner or reopen cookie settings
              from the footer. For access or deletion requests, email{" "}
              <a
                className="text-bf-accent-bright underline"
                href={`mailto:${siteConfig.privacyEmail}`}
              >
                {siteConfig.privacyEmail}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
