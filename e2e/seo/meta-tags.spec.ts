import { test, expect } from '@playwright/test';

test.describe('SEO — Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('title e meta description presentes', async ({ page }) => {
    await expect(page).toHaveTitle(/Seu Negócio/);

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute('content', /.+/);
  });

  test('canonical e Open Graph configurados', async ({ page }) => {
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /exemplo\.com\.br/);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Seu Negócio/);

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-default\.jpg/);
  });

  test('JSON-LD LocalBusiness válido', async ({ page }) => {
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);

    const data = JSON.parse((await jsonLd.textContent()) ?? '{}');
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('LocalBusiness');
    expect(data.name).toBe('Seu Negócio');
    expect(data.address).toBeDefined();
  });
});
