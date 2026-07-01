import { test, expect } from "@playwright/test";

test.describe("Visual regression", () => {
  test.use({ reducedMotion: "reduce" });

  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Snapshots estáveis apenas em chromium desktop",
    );
  });

  test("homepage — layout desktop", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-desktop.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});
