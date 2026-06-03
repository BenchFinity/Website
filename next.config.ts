import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  // Tailwind/inline styles require 'unsafe-inline'.
  "style-src 'self' 'unsafe-inline'",
  // Next inline bootstrap + JSON-LD require 'unsafe-inline' (nonce is out of scope).
  "script-src 'self' 'unsafe-inline'",
  // PostHog analytics endpoints.
  "connect-src 'self' https://*.posthog.com https://*.i.posthog.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
