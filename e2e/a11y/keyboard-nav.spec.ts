import { test, expect } from '@playwright/test';

test.describe('Navegação por teclado', () => {
  test.describe('menu mobile', () => {
    test.beforeEach(({ }, testInfo) => {
      test.skip(testInfo.project.name !== 'mobile', 'Menu mobile só em viewport mobile');
    });

    test('abre com Enter e fecha com Escape', async ({ page }) => {
      await page.goto('/');

      await page.waitForFunction(
        () => document.querySelector('[data-menu-toggle]')?.getAttribute('data-menu-bound') === 'true',
      );

      const menuToggle = page.locator('[data-menu-toggle]');
      await menuToggle.focus();
      await page.keyboard.press('Enter');

      await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#mobile-menu')).toBeVisible();

      const firstLink = page.locator('#mobile-menu a').first();
      await expect(firstLink).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
      await expect(page.locator('#mobile-menu')).toBeHidden();
      await expect(menuToggle).toBeFocused();
    });

    test('focus trap com Tab', async ({ page }) => {
      await page.goto('/');

      const menuToggle = page.locator('[data-menu-toggle]');
      await menuToggle.click();

      const menuLinks = page.locator('#mobile-menu a');
      const linkCount = await menuLinks.count();
      expect(linkCount).toBeGreaterThan(0);

      await expect(menuLinks.first()).toBeFocused();

      for (let i = 0; i < linkCount - 1; i++) {
        await page.keyboard.press('Tab');
      }
      await expect(menuLinks.last()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(menuLinks.first()).toBeFocused();
    });
  });

  test('skip link foca o conteúdo principal', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /pular para o conteúdo/i });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('formulário de contato — ordem de foco lógica', async ({ page }) => {
    await page.goto('/#contato');

    const nameInput = page.locator('#contact-name');
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('#contact-email')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('#contact-phone')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('#contact-message')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /enviar mensagem/i })).toBeFocused();
  });
});
