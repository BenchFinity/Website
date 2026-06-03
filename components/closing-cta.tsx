import { CtaRow } from "@/components/cta-row";
import { StatusPill } from "@/components/status-pill";

type ClosingCtaProps = {
  heading: string;
  body: string;
  align?: "left" | "center";
  includeExamples?: boolean;
  statusPill?: React.ReactNode;
  padding?: "py" | "pb";
};

export function ClosingCta({
  heading,
  body,
  align = "center",
  includeExamples = false,
  statusPill,
  padding = "py",
}: ClosingCtaProps) {
  const paddingClass = padding === "pb" ? "pb-20" : "py-20";

  return (
    <section
      className={`mx-auto max-w-4xl px-6 ${paddingClass} text-center sm:px-8 lg:px-12`}
    >
      {statusPill ? <StatusPill tone="neutral">{statusPill}</StatusPill> : null}
      <h2
        className={`text-3xl font-semibold sm:text-4xl${statusPill ? "mt-6" : ""}`}
      >
        {heading}
      </h2>
      <p className="text-bf-text-muted mx-auto mt-5 max-w-2xl leading-7">
        {body}
      </p>
      <div className="mt-8">
        <CtaRow align={align} includeExamples={includeExamples} />
      </div>
    </section>
  );
}
