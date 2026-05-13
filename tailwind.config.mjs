/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],

  // Mobile-first é o padrão do Tailwind: utilitários sem prefixo aplicam a partir
  // do mobile; breakpoints `sm`, `md`, `lg`, `xl`, `2xl` são min-width.
  theme: {
    extend: {
      // ===========================================================================
      // === DESIGN SYSTEM TOKENS ===
      // Conecte aqui as variáveis CSS expostas pelo Design System externo.
      // Exemplo (descomente e ajuste quando o DS for aplicado):
      //
      // colors: {
      //   primary:   'var(--color-primary)',
      //   secondary: 'var(--color-secondary)',
      //   accent:    'var(--color-accent)',
      //   surface:   'var(--color-surface)',
      //   foreground:'var(--color-foreground)',
      //   muted:     'var(--color-muted)',
      // },
      //
      // fontFamily: {
      //   sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
      //   display: ['var(--font-display)', 'serif'],
      // },
      //
      // borderRadius: {
      //   DEFAULT: 'var(--radius-md)',
      //   lg:      'var(--radius-lg)',
      // },
      //
      // boxShadow: {
      //   card: 'var(--shadow-card)',
      // },
      // ===========================================================================
    },
  },

  plugins: [
    // Adicione aqui plugins do Tailwind (forms, typography, etc.) caso o DS exija.
  ],
};
