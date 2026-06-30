import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

/** Pressiona Tab `count` vezes. */
export async function tabThrough(page: Page, count: number): Promise<void> {
  for (let i = 0; i < count; i++) {
    await page.keyboard.press('Tab');
  }
}

/** Verifica se o elemento focado está dentro do container. */
export async function assertFocusWithin(page: Page, container: Locator): Promise<void> {
  const focused = page.locator(':focus');
  await expect(focused).toBeVisible();
  await expect(container).toContainText((await focused.textContent()) ?? '');
}

/** Navega com Tab até encontrar um elemento que satisfaça o predicado. */
export async function tabUntil(
  page: Page,
  predicate: (focused: Locator) => Promise<boolean>,
  maxTabs = 30,
): Promise<Locator> {
  for (let i = 0; i < maxTabs; i++) {
    const focused = page.locator(':focus');
    if (await predicate(focused)) return focused;
    await page.keyboard.press('Tab');
  }
  throw new Error('Elemento não encontrado após navegação por Tab');
}
