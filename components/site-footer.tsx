import Link from "next/link";
import { ConsentSettingsButton } from "@/components/consent-settings-button";
import { TrackedLink } from "@/components/tracked-link";
import { footerNavigation, primaryNavigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-bf-border bg-bf-bg border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-12">
        <div>
          <p className="text-bf-text text-lg font-semibold">Benchfinity</p>
          <p className="text-bf-text-muted mt-4 max-w-md text-sm leading-6">
            <TrackedLink
              className="hover:text-bf-accent-bright underline"
              href={siteConfig.links.methodology}
              eventProperties={{ destination: "methodology" }}
            >
              Built in the open by a solo founder with Claude
            </TrackedLink>
            . Free and open source, with the Workbench code shipping AGPL-3.0.
          </p>
        </div>
        <nav aria-label="Footer site links">
          <p className="text-bf-text font-mono text-sm uppercase">Site</p>
          <ul className="mt-4 space-y-3 text-sm">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-bf-text-muted hover:text-bf-accent-bright"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-bf-text-muted hover:text-bf-accent-bright"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ConsentSettingsButton className="text-bf-text-muted hover:text-bf-accent-bright text-left underline" />
            </li>
          </ul>
        </nav>
        <nav aria-label="Community links">
          <p className="text-bf-text font-mono text-sm uppercase">Open</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <TrackedLink
                className="text-bf-text-muted hover:text-bf-accent-bright"
                href={siteConfig.links.github}
                eventProperties={{ destination: "github_org" }}
              >
                GitHub
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                className="text-bf-text-muted hover:text-bf-accent-bright"
                href={siteConfig.links.workbench}
                eventProperties={{ destination: "workbench_repo" }}
              >
                Workbench repo
              </TrackedLink>
            </li>
            <li>
              {siteConfig.links.discord ? (
                <TrackedLink
                  className="text-bf-text-muted hover:text-bf-accent-bright"
                  href={siteConfig.links.discord}
                  eventProperties={{ destination: "discord" }}
                >
                  Discord
                </TrackedLink>
              ) : (
                <span className="text-bf-text-muted">Discord pending</span>
              )}
            </li>
            {siteConfig.links.sponsor ? (
              <li>
                <TrackedLink
                  className="text-bf-text-muted hover:text-bf-accent-bright"
                  href={siteConfig.links.sponsor}
                  eventProperties={{ destination: "sponsor" }}
                >
                  Sponsor
                </TrackedLink>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
