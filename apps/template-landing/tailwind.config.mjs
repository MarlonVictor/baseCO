/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    '../../packages/ui/src/**/*.{astro,html,js,jsx,ts,tsx}',
    '../../packages/seo/src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
