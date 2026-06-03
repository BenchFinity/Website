import Link from "next/link";

type CardPadding = "sm" | "md";

const paddingClass: Record<CardPadding, string> = {
  sm: "p-5",
  md: "p-6",
};

const baseClass = "border-bf-border bg-bf-surface border";
const linkClass = "hover:border-bf-accent block transition";

type CardProps = {
  children: React.ReactNode;
  padding?: CardPadding;
  className?: string;
};

export function Card({ children, padding = "md", className }: CardProps) {
  return (
    <div className={`${baseClass} ${paddingClass[padding]} ${className ?? ""}`}>
      {children}
    </div>
  );
}

type LinkCardProps = CardProps & {
  href: string;
};

export function LinkCard({
  children,
  href,
  padding = "md",
  className,
}: LinkCardProps) {
  return (
    <Link
      href={href}
      className={`${baseClass} ${linkClass} ${paddingClass[padding]} ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
