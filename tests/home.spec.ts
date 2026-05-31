import { expect, test } from "@playwright/test";

test("renders the Benchfinity home page with the locked headline", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle(
    "Benchfinity — Build Your Whole Gridfinity Workspace System",
  );
  await expect(
    page.getByRole("heading", { name: "Build your workspace system." }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "The open, unified platform for Gridfinity-standard generation",
    ),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Build something now" }).first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole("link", {
        name: "Create an account and build entire systems",
      })
      .first(),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore Examples" }),
  ).toBeVisible();
});

test("primary navigation links resolve", async ({ page }) => {
  await page.goto("/");
  const primaryNav = page.getByRole("navigation", { name: "Primary" });

  await primaryNav.getByRole("link", { name: "How it works" }).click();
  await expect(page).toHaveURL(/\/how-it-works$/);
  await expect(
    page.getByRole("heading", { name: "Systemize your collection." }),
  ).toBeVisible();

  await page.goto("/");
  await primaryNav.getByRole("link", { name: "Use Cases" }).click();
  await expect(page).toHaveURL(/\/use-cases$/);
  await expect(
    page.getByRole("heading", { name: "Collections where fit matters." }),
  ).toBeVisible();

  await page.goto("/");
  await primaryNav.getByRole("link", { name: "Examples" }).click();
  await expect(page).toHaveURL(/\/examples$/);
  await expect(
    page.getByRole("heading", {
      name: "Preview: the models are the marketing.",
    }),
  ).toBeVisible();

  await page.goto("/");
  await primaryNav.getByRole("link", { name: "Open Source" }).click();
  await expect(page).toHaveURL(/\/open-source$/);
  await expect(
    page.getByRole("heading", { name: "Free and open source." }),
  ).toBeVisible();

  await page.goto("/");
  await primaryNav.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(
    page.getByRole("heading", { name: "Build notes and field evidence." }),
  ).toBeVisible();

  await page.goto("/");
  await primaryNav.getByRole("link", { name: "FAQ" }).click();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(
    page.getByRole("heading", {
      name: "Clear answers before the roadmap grows.",
    }),
  ).toBeVisible();
});

test("publishes canonical metadata and keeps preview examples noindex", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "The open, unified platform for Gridfinity-standard generation — turn a whole collection into one coordinated workspace system. Free & open source.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/benchfinity\.com\/?$/,
  );

  await page.goto("/examples");

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://benchfinity.com/examples",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("cookie consent can be rejected and reopened from settings", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Analytics consent" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reject" }).click();

  await expect(
    page.getByRole("heading", { name: "Analytics consent" }),
  ).not.toBeVisible();
  await expect(
    page.evaluate(() =>
      window.localStorage.getItem("benchfinity.analytics-consent"),
    ),
  ).resolves.toBe("rejected");

  await page
    .getByRole("contentinfo")
    .getByRole("button", { name: "Cookie settings" })
    .click();

  await expect(page.getByText("Current setting: rejected.")).toBeVisible();
  await page.getByRole("button", { name: "Accept analytics" }).click();
  await expect(
    page.evaluate(() =>
      window.localStorage.getItem("benchfinity.analytics-consent"),
    ),
  ).resolves.toBe("accepted");
});
