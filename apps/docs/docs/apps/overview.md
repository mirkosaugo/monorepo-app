---
sidebar_position: 1
---

# Apps Overview

The `apps/` directory contains all deployable applications in the monorepo. Each app is independent but can share packages from the `packages/` directory.

## Current Apps

| App | Description | Port | Tech |
|-----|-------------|------|------|
| [web](/apps/nextjs-web) | Next.js Todo App demo | 3000 | Next.js 14, React 18 |
| [storybook](/apps/storybook) | Component documentation | 6006 | Storybook 8, Vite |
| [docs](/apps/docusaurus) | Project documentation | 3002 | Docusaurus 3 |

## App Structure

Each app follows a similar structure:

```
apps/<app-name>/
├── package.json          # App-specific dependencies and scripts
├── tsconfig.json         # TypeScript configuration (extends root)
├── ...                   # Framework-specific files
└── src/ or app/          # Source code
```

## Shared Configuration

All apps extend the root TypeScript configuration and can use packages from the workspace:

```json
{
  "dependencies": {
    "@monorepo-app/ui": "workspace:*"
  }
}
```

## Running Apps

### All Apps Together

```bash
pnpm dev
```

### Individual Apps

```bash
pnpm dev:web        # Next.js on port 3000
pnpm dev:storybook  # Storybook on port 6006
pnpm dev:docs       # Docusaurus on port 3002
```

### Using Turbo Filter

```bash
pnpm turbo dev --filter=web
pnpm turbo dev --filter=web --filter=storybook
```

## Building Apps

### All Apps

```bash
pnpm build
```

### Specific App

```bash
pnpm turbo build --filter=web
```

## Adding New Apps

See the [Adding Apps](/apps/adding-apps) guide for step-by-step instructions on creating new apps in the monorepo.

## App Dependencies

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

All apps can depend on shared packages, but apps do not depend on each other.
