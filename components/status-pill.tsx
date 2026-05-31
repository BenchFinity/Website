type StatusPillProps = {
  children: React.ReactNode;
  tone?: "live" | "roadmap" | "neutral";
};

export function StatusPill({ children, tone = "neutral" }: StatusPillProps) {
  const toneClass =
    tone === "live"
      ? "border-bf-success text-bf-success"
      : tone === "roadmap"
        ? "border-bf-signal text-bf-signal"
        : "border-bf-border text-bf-text-muted";

  return (
    <span
      className={`inline-flex border px-2.5 py-1 font-mono text-xs uppercase ${toneClass}`}
    >
      {children}
    </span>
  );
}
