import { test, expect } from '@playwright/test';
import { assertNoA11yViolations } from '@repo/testing/axe-setup';

test.describe('Acessibilidade — Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('sem violações WCAG 2.2 AA (axe-core)', async ({ page }) => {
    await assertNoA11yViolations(page);
  });

  test('landmarks estruturais', async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === 'mobile';

    await expect(page.locator('main#main-content')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('header[role="banner"]')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);

    if (isMobile) {
      await expect(page.getByRole('button', { name: 'Abrir menu de navegação' })).toHaveCount(1);
      await expect(page.locator('nav[aria-label="Navegação mobile"]')).toBeAttached();
    } else {
      await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toHaveCount(1);
    }

    await expect(page.getByRole('navigation', { name: 'Navegação do rodapé' })).toHaveCount(1);
  });

  test('skip link foca o conteúdo principal', async ({ page }) => {
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /pular para o conteúdo/i });
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });
});
