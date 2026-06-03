# Security Policy

Thank you for helping keep Benchfinity and its users safe. This policy covers
the **`BenchFinity/Website`** repository — the marketing/content site at
`https://www.benchfinity.com` and its container image.

The Workbench application is a separate project; report issues there in its own
repository: <https://github.com/BenchFinity/Workbench>.

## Supported versions

The website is continuously deployed from the `main` branch. Only the currently
deployed version is supported — there are no maintained older releases. Fixes
ship forward via the normal release flow.

## Reporting a vulnerability

**Please do not open a public issue, pull request, or Discord message for
security problems.** Use a private channel so the issue is not disclosed before
a fix is available.

Preferred — **GitHub private vulnerability reporting** (report stays private to
maintainers):

1. Go to the repository's **Security** tab.
2. Choose **Report a vulnerability**, or use the direct link:
   <https://github.com/BenchFinity/Website/security/advisories/new>

Alternative — email **privacy@benchfinity.com** with the details below.

### What to include

- A clear description of the issue and its impact.
- Steps to reproduce (proof-of-concept, affected URL/route, or request/response
  pair if applicable).
- Affected component or version/commit, and any relevant configuration.
- Your assessment of severity, if you have one.

## What to expect

- **Acknowledgement** within 3 business days.
- A triage decision and severity assessment, with status updates as we
  investigate and fix.
- Credit in the advisory once a fix is released, unless you prefer to remain
  anonymous.

We follow **coordinated disclosure**: please give us a reasonable window to
release a fix before any public disclosure.

## Safe harbor

We welcome good-faith security research. If you make a good-faith effort to
comply with this policy, we will not pursue or support legal action related to
your research. Good faith means: avoid privacy violations, data destruction, and
service degradation; only interact with accounts/data you own or have explicit
permission to test; and stop and report once you have demonstrated an issue
rather than exfiltrating data or pivoting further.

## Scope notes

- This site is a static, build-time-rendered marketing/content site with no
  user accounts or authentication. Analytics are consent-gated.
- Out of scope: findings that require a compromised device or browser,
  social-engineering of Benchfinity staff, volumetric denial-of-service, and
  best-practice suggestions with no demonstrable security impact (e.g. missing
  headers already covered by the deployed configuration).
