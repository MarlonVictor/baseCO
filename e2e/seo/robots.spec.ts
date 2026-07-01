import { test, expect } from "@playwright/test";

test.describe("SEO — robots.txt", () => {
  test("referencia sitemap e bloqueia admin", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toMatch(/Sitemap:\s*https?:\/\//);
    expect(body).toContain("Disallow: /admin/");
  });
});
