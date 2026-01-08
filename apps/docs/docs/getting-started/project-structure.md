---
sidebar_position: 2
---

# Project Structure

Understanding the monorepo structure is key to working effectively with this codebase.

## Overview

```
turborepo-shadcn/
├── apps/
│   ├── web/                    # Next.js 14 application
│   ├── storybook/              # Storybook component documentation
│   └── docs/                   # Docusaurus documentation site
├── packages/
│   └── ui/                     # Shared component library (@monorepo-app/ui)
├── turbo.json                  # Turborepo pipeline configuration
├── pnpm-workspace.yaml         # pnpm workspace definition
├── package.json                # Root package with workspace scripts
└── tsconfig.json               # Base TypeScript configuration
```

## Root Files

### `turbo.json`

Defines the build pipeline and task dependencies:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**", "storybook-static/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    }
  }
}
```

Key concepts:
- `dependsOn: ["^build"]` - Build dependencies first (packages before apps)
- `outputs` - Directories to cache
- `persistent: true` - Keep dev servers running

### `pnpm-workspace.yaml`

Defines which folders are part of the workspace:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### `package.json` (root)

Contains workspace-level scripts:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "dev:web": "turbo dev --filter=web",
    "dev:storybook": "turbo dev --filter=storybook",
    "dev:docs": "turbo dev --filter=docs"
  }
}
```

## Apps Directory

### `apps/web/` - Next.js Application

```
apps/web/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page (Todo App)
│   └── globals.css             # Global styles with CSS variables
├── package.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── tsconfig.json
```

Key configuration in `next.config.js`:
```js
const nextConfig = {
  transpilePackages: ["@monorepo-app/ui"],  // Important for monorepo!
};
```

### `apps/storybook/` - Storybook

```
apps/storybook/
├── .storybook/
│   ├── main.ts                 # Storybook configuration
│   ├── preview.ts              # Story decorators and parameters
│   └── globals.css             # Tailwind styles for stories
├── stories/
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   ├── Card.stories.tsx
│   └── Checkbox.stories.tsx
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

### `apps/docs/` - Docusaurus

```
apps/docs/
├── docs/                       # Markdown documentation
│   ├── intro.md
│   ├── getting-started/
│   ├── components/
│   ├── apps/
│   ├── packages/
│   └── guides/
├── src/
│   └── css/
│       └── custom.css          # Custom theme styles
├── docusaurus.config.ts        # Docusaurus configuration
├── sidebars.ts                 # Sidebar navigation
└── package.json
```

## Packages Directory

### `packages/ui/` - Component Library

```
packages/ui/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       └── checkbox.tsx
│   ├── lib/
│   │   └── utils.ts            # cn() utility function
│   ├── globals.css             # Base Tailwind styles
│   └── index.ts                # Public exports
├── package.json
├── tailwind.config.ts
├── postcss.config.js
└── tsconfig.json
```

The `package.json` exports configuration:
```json
{
  "name": "@monorepo-app/ui",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./globals.css": "./src/globals.css"
  }
}
```

## Dependency Graph

```
                    ┌─────────────┐
                    │  @monorepo-app/ui   │
                    │  (package)  │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │    web      │ │  storybook  │ │    docs     │
    │  (Next.js)  │ │ (Storybook) │ │ (Docusaurus)│
    └─────────────┘ └─────────────┘ └─────────────┘
```

All apps depend on `@monorepo-app/ui`, but apps don't depend on each other.

## TypeScript Configuration

The root `tsconfig.json` provides base settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "jsx": "preserve"
  }
}
```

Each app/package extends this and adds its own paths and settings.
