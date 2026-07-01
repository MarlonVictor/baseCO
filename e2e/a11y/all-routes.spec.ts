import { test, expect } from "@playwright/test";
import { assertNoA11yViolations } from "../helpers/axe-setup";
import { discoverSourceRoutes } from "../../testing/discover-routes";

const publicRoutes = discoverSourceRoutes();

for (const route of publicRoutes) {
  test.describe(`Acessibilidade — ${route}`, () => {
    test("sem violações WCAG 2.2 AA (axe-core)", async ({ page }) => {
      await page.goto(route);
      await assertNoA11yViolations(page);
    });

    if (route === "/") {
      test("landmarks estruturais", async ({ page }, testInfo) => {
        await page.goto(route);
        const isMobile = testInfo.project.name === "mobile";

        await expect(page.locator("main#main-content")).toHaveCount(1);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator('header[role="banner"]')).toHaveCount(1);
        await expect(page.locator("footer")).toHaveCount(1);

        if (isMobile) {
          await expect(
            page.getByRole("button", { name: "Abrir menu de navegação" }),
          ).toHaveCount(1);
          await expect(
            page.locator('nav[aria-label="Navegação mobile"]'),
          ).toBeAttached();
        } else {
          await expect(
            page.getByRole("navigation", { name: "Navegação principal" }),
          ).toHaveCount(1);
        }

        await expect(
          page.getByRole("navigation", { name: "Navegação do rodapé" }),
        ).toHaveCount(1);
      });
    }
  });
}
