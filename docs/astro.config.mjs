// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const templatesDir = path.resolve(__dirname, '../src/templates');

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'SkeciUI',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/CandraJengger/skeci-ui',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'introduction' },
            { label: 'Installation', slug: 'installation' },
            { label: 'Theming', slug: 'theming' },
          ],
        },
        {
          label: 'Components',
          autogenerate: {
            directory: 'components',
          },
        },
      ],
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@templates': templatesDir,
      },
      dedupe: ['react', 'react-dom', 'lucide-react', '@radix-ui/react-slot', 'sonner', 'react-datepicker', 'date-fns'],
    },
  },
});