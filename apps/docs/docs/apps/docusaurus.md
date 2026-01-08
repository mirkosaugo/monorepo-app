---
sidebar_position: 4
---

# Docusaurus (This Documentation)

The `apps/docs` directory contains the Docusaurus application that powers this documentation site.

## Overview

- **Framework**: Docusaurus 3
- **Port**: 3002
- **Purpose**: Project documentation

## Directory Structure

```
apps/docs/
├── docs/                       # Markdown documentation files
│   ├── intro.md               # Home page
│   ├── getting-started/       # Getting started guides
│   ├── components/            # Component documentation
│   ├── apps/                  # App documentation
│   ├── packages/              # Package documentation
│   └── guides/                # How-to guides
├── src/
│   └── css/
│       └── custom.css         # Custom theme styles
├── static/
│   └── img/                   # Static images
├── docusaurus.config.ts       # Docusaurus configuration
├── sidebars.ts                # Sidebar navigation
├── package.json
└── tsconfig.json
```

## How This App Was Created

This section serves as a **complete guide** for adding Docusaurus to a Turborepo monorepo. Follow these steps to add documentation to your own monorepo.

### Step 1: Create the Directory

```bash
mkdir -p apps/docs
```

### Step 2: Create package.json

Create `apps/docs/package.json`:

```json
{
  "name": "docs",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "docusaurus start --port 3002",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "clear": "docusaurus clear"
  },
  "dependencies": {
    "@docusaurus/core": "^3.6.0",
    "@docusaurus/preset-classic": "^3.6.0",
    "@mdx-js/react": "^3.0.0",
    "clsx": "^2.1.0",
    "prism-react-renderer": "^2.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.6.0",
    "@docusaurus/types": "^3.6.0",
    "typescript": "^5.3.0"
  },
  "engines": {
    "node": ">=18.0"
  }
}
```

### Step 3: Create docusaurus.config.ts

Create `apps/docs/docusaurus.config.ts`:

```ts
import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Your Project Name",
  tagline: "Your project tagline",
  favicon: "img/favicon.ico",

  url: "https://your-site.example.com",
  baseUrl: "/",

  organizationName: "your-org",
  projectName: "your-project",

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
          routeBasePath: "/",  // Docs at root URL
        },
        blog: false,  // Disable blog
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Your Project",
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://github.com/your-org/your-repo",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json", "tsx"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
```

### Step 4: Create sidebars.ts

Create `apps/docs/sidebars.ts`:

```ts
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/installation"],
    },
    // Add more categories as needed
  ],
};

export default sidebars;
```

### Step 5: Create tsconfig.json

Create `apps/docs/tsconfig.json`:

```json
{
  "extends": "@docusaurus/module-type-aliases",
  "compilerOptions": {
    "baseUrl": ".",
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src/", "docs/", "docusaurus.config.ts", "sidebars.ts"]
}
```

### Step 6: Create Custom CSS

Create `apps/docs/src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #0f172a;
  --ifm-color-primary-dark: #0d1424;
  --ifm-color-primary-darker: #0c1322;
  --ifm-color-primary-darkest: #0a0f1c;
  --ifm-color-primary-light: #111a30;
  --ifm-color-primary-lighter: #121b32;
  --ifm-color-primary-lightest: #142038;
  --ifm-code-font-size: 95%;
}

[data-theme="dark"] {
  --ifm-color-primary: #f8fafc;
  --ifm-color-primary-dark: #e2e8f0;
  --ifm-color-primary-darker: #d9e1eb;
  --ifm-color-primary-darkest: #c0ccd9;
  --ifm-color-primary-light: #ffffff;
  --ifm-color-primary-lighter: #ffffff;
  --ifm-color-primary-lightest: #ffffff;
}
```

### Step 7: Create Your First Doc

Create `apps/docs/docs/intro.md`:

```md
---
slug: /
sidebar_position: 1
---

# Welcome

Welcome to the documentation!

## Quick Start

\`\`\`bash
pnpm install
pnpm dev
\`\`\`
```

### Step 8: Create Static Directory

```bash
mkdir -p apps/docs/static/img
```

### Step 9: Update Root package.json

Add the docs command to root `package.json`:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "dev:docs": "turbo dev --filter=docs"
  }
}
```

### Step 10: Install and Run

```bash
pnpm install
pnpm dev:docs
```

Open [http://localhost:3002](http://localhost:3002).

## Writing Documentation

### Markdown Frontmatter

Every doc file should have frontmatter:

```md
---
sidebar_position: 1
title: Custom Title
description: SEO description
---

# Page Content
```

### Code Blocks

Use triple backticks with language:

````md
```tsx
import { Button } from "@monorepo-app/ui";
```
````

### Tabs

```md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm">
    npm install
  </TabItem>
  <TabItem value="pnpm" label="pnpm">
    pnpm install
  </TabItem>
</Tabs>
```

### Admonitions

```md
:::note
This is a note
:::

:::tip
This is a tip
:::

:::warning
This is a warning
:::

:::danger
This is dangerous
:::
```

## Adding New Pages

1. Create a new `.md` or `.mdx` file in `docs/`
2. Add frontmatter with `sidebar_position`
3. Update `sidebars.ts` if needed

### Nested Categories

```
docs/
├── intro.md
├── guides/
│   ├── _category_.json     # Category metadata
│   ├── guide-one.md
│   └── guide-two.md
```

`_category_.json`:
```json
{
  "label": "Guides",
  "position": 3,
  "collapsed": false
}
```

## Customization

### Theme Colors

Edit `src/css/custom.css` to change colors. Use the [Docusaurus color generator](https://docusaurus.io/docs/styling-layout#styling-your-site-with-infima).

### Navbar

Edit `docusaurus.config.ts` → `themeConfig.navbar`.

### Footer

Edit `docusaurus.config.ts` → `themeConfig.footer`.

## Building for Production

```bash
pnpm turbo build --filter=docs
```

Output is in `apps/docs/build/`.

## Deployment

Docusaurus can be deployed to:

- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Any static hosting**

Example Vercel configuration for monorepo:

```json
{
  "buildCommand": "cd ../.. && pnpm turbo build --filter=docs",
  "outputDirectory": "build"
}
```
