import { themes as prismThemes } from 'prism-react-renderer';

export default {
  title: 'xeus-runner',
  tagline:
    'Run xeus WebAssembly kernels in TypeScript/JavaScript outside of JupyterLite',
  url: 'https://xeus-runner.github.io',
  baseUrl: '/',
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
      },
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
        out: 'docs/api',
        name: 'API',
        readme: 'none',
        plugin: ['./typedoc-index.mjs'],
        categorizeByGroup: false,
        defaultCategory: 'General',
        categoryOrder: ['General', 'Customisation'],
        navigation: { includeCategories: true },
      },
    ],
  ],
  themeConfig: {
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    navbar: {
      title: 'xeus-runner',
      items: [
        {
          href: 'https://github.com/xeus-runner/xeus-runner',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
  },
};
