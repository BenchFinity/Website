import type { MDXComponents } from "mdx/types";

function mergeClassName(baseClassName: string, className: unknown) {
  return typeof className === "string"
    ? `${baseClassName} ${className}`
    : baseClassName;
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="text-bf-text mt-10 text-4xl font-semibold" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-bf-text mt-10 text-2xl font-semibold" {...props} />
  ),
  p: (props) => <p className="text-bf-text-muted mt-5 leading-7" {...props} />,
  a: (props) => <a className="text-bf-accent-bright underline" {...props} />,
  ul: (props) => (
    <ul
      className="text-bf-text-muted mt-5 list-disc space-y-2 pl-5"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  pre: ({ className, ...props }) => (
    <pre
      className={mergeClassName(
        "border-bf-border bg-bf-surface mt-6 overflow-x-auto border p-4 text-sm",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={mergeClassName(
        "border-bf-border bg-bf-surface text-bf-text border px-1.5 py-0.5 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
