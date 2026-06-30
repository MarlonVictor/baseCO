/**
 * MobileMenu — interatividade do menu mobile com focus trap e Escape.
 * Carregado como island apenas em viewports mobile (client:media equivalente).
 */

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
  );
}

export function attachMobileMenu(header: HTMLElement): void {
  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = header.querySelector<HTMLElement>('[data-mobile-menu]');
  if (!toggle || !menu || toggle.dataset.menuBound === 'true') return;

  toggle.dataset.menuBound = 'true';
  let previouslyFocused: HTMLElement | null = null;

  const open = (): void => {
    previouslyFocused = document.activeElement as HTMLElement | null;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu de navegação');
    menu.classList.remove('hidden');

    const focusable = getFocusableElements(menu);
    focusable[0]?.focus();
  };

  const close = (): void => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    menu.classList.add('hidden');
    previouslyFocused?.focus();
    previouslyFocused = null;
  };

  const isOpen = (): boolean => toggle.getAttribute('aria-expanded') === 'true';

  const handleKeydown = (event: KeyboardEvent): void => {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements(menu);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  toggle.addEventListener('click', () => {
    if (isOpen()) close();
    else open();
  });

  document.addEventListener('keydown', handleKeydown);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });
}

export function initMobileMenus(): void {
  document
    .querySelectorAll<HTMLElement>('header[data-section="header"]')
    .forEach(attachMobileMenu);
}
