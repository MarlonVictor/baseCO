import { test, expect } from "@playwright/test";
import {
  assertBaseSeo,
  assertNoFailedResources,
} from "../helpers/seo-assertions";
import { discoverSourceRoutes } from "../../testing/discover-routes";

const publicRoutes = discoverSourceRoutes();

for (const route of publicRoutes) {
  test.describe(`SEO — ${route}`, () => {
    test("meta-tags, canonical e h1", async ({ page }) => {
      await page.goto(route);
      await assertBaseSeo(page, {
        title: route === "/" ? /Seu Negócio/ : undefined,
        canonical: /exemplo\.com\.br/,
      });
    });

    test("sem recursos 4xx/5xx", async ({ page }) => {
      await assertNoFailedResources(page, route);
    });

    if (route === "/") {
      test("Open Graph com imagem raster", async ({ page }) => {
        await page.goto(route);
        const ogImage = page.locator('meta[property="og:image"]');
        await expect(ogImage).toHaveAttribute("content", /og-default\.jpg/);
      });

      test("JSON-LD LocalBusiness válido", async ({ page }) => {
        await page.goto(route);
        const jsonLd = page.locator('script[type="application/ld+json"]');
        await expect(jsonLd).toHaveCount(1);

        const data = JSON.parse((await jsonLd.textContent()) ?? "{}");
        expect(data["@context"]).toBe("https://schema.org");
        expect(data["@type"]).toBe("LocalBusiness");
        expect(data.name).toBe("Seu Negócio");
        expect(data.address).toBeDefined();
      });
    }
  });
}
