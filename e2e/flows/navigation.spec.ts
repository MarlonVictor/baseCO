import { test, expect } from "@playwright/test";

test.describe("Navegação — fluxos desktop", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "mobile",
      "Menu de âncoras no header desktop",
    );
    await page.goto("/");
  });

  test("links âncora navegam para seções", async ({ page }) => {
    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Contato" })
      .click();
    await expect(page).toHaveURL(/#contato$/);
    await expect(page.locator("#contato")).toBeVisible();

    await page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Diferenciais" })
      .click();
    await expect(page).toHaveURL(/#features$/);
    await expect(page.locator("#features")).toBeVisible();
  });

  test("aria-current reflete a seção ativa", async ({ page }) => {
    await page.goto("/#contato");

    const contactLink = page.locator('.header__link[href="#contato"]').first();
    await expect(contactLink).toHaveAttribute("aria-current", "page");

    const featuresLink = page
      .locator('.header__link[href="#features"]')
      .first();
    await expect(featuresLink).not.toHaveAttribute("aria-current", "page");
  });
});

test.describe("Navegação — fluxos gerais", () => {
  test("logo aponta para início", async ({ page }) => {
    await page.goto("/#contato");
    await page.getByRole("link", { name: /Página inicial/i }).click();
    await expect(page).toHaveURL(/\/?(#inicio)?$/);
  });
});
