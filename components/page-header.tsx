type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-bf-accent-bright font-mono text-sm uppercase">
        {eyebrow}
      </p>
      <h1 className="text-bf-text mt-6 text-4xl leading-tight font-semibold sm:text-5xl">
        {title}
      </h1>
      <p className="text-bf-text-muted mt-6 text-lg leading-8">{description}</p>
    </header>
  );
}
