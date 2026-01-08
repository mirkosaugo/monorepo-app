import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Turborepo shadcn/ui",
  tagline: "A modern monorepo with Next.js, Storybook, and shadcn/ui",
  favicon: "img/favicon.ico",

  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  organizationName: "your-org",
  projectName: "turborepo-shadcn",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Turborepo shadcn/ui",
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/your-org/turborepo-shadcn",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/",
            },
            {
              label: "Components",
              to: "/components/overview",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Turborepo",
              href: "https://turbo.build/",
            },
            {
              label: "shadcn/ui",
              href: "https://ui.shadcn.com/",
            },
            {
              label: "Next.js",
              href: "https://nextjs.org/",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Turborepo shadcn/ui. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "tsx"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
