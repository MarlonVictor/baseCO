import { expect, type Page } from "@playwright/test";

export interface BaseSeoExpectations {
  /** RegExp ou string parcial para document.title */
  title?: RegExp | string;
  /** Host ou path esperado no canonical (ex: exemplo.com.br) */
  canonical?: RegExp | string;
  /** Exige exatamente um h1 */
  requireH1?: boolean;
  /** Exige meta description não vazia */
  requireDescription?: boolean;
}

/**
 * Asserções SEO mínimas para qualquer página pública.
 */
export async function assertBaseSeo(
  page: Page,
  expectations: BaseSeoExpectations = {},
) {
  const {
    title,
    canonical,
    requireH1 = true,
    requireDescription = true,
  } = expectations;

  if (title !== undefined) {
    await expect(page).toHaveTitle(title);
  } else {
    await expect(page).toHaveTitle(/.+/);
  }

  if (requireDescription) {
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.+/);
  }

  const canonicalLink = page.locator('link[rel="canonical"]');
  await expect(canonicalLink).toHaveCount(1);
  if (canonical !== undefined) {
    await expect(canonicalLink).toHaveAttribute("href", canonical);
  } else {
    await expect(canonicalLink).toHaveAttribute("href", /^https?:\/\//);
  }

  const ogTitle = page.locator('meta[property="og:title"]');
  await expect(ogTitle).toHaveAttribute("content", /.+/);

  const ogImage = page.locator('meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute("content", /.+/);

  if (requireH1) {
    await expect(page.locator("h1")).toHaveCount(1);
  }
}

/**
 * Falha se algum recurso retornar 4xx/5xx durante o carregamento.
 */
export async function assertNoFailedResources(page: Page, url: string) {
  const failures: string[] = [];

  page.on("response", (response) => {
    if (response.status() >= 400) {
      failures.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto(url);
  expect(failures, failures.join("\n")).toEqual([]);
}
