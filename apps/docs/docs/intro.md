---
slug: /
sidebar_position: 1
---

# Introduction

Welcome to the **Monorepo app** documentation. This is a modern, production-ready monorepo setup featuring:

- **Turborepo** - High-performance build system for monorepos
- **Next.js 14** - React framework with App Router
- **Storybook 8** - Component documentation and testing
- **Docusaurus** - Documentation site (you're reading it!)
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Full type safety across the monorepo
- **pnpm** - Fast, disk space efficient package manager

## Why This Stack?

### Turborepo

Turborepo provides intelligent caching and parallel execution of tasks. When you modify a component, only the affected packages and apps are rebuilt, dramatically speeding up development.

### shadcn/ui

Unlike traditional component libraries, shadcn/ui gives you ownership of your components. You can customize them freely without fighting against library constraints.

### Monorepo Architecture

All your apps share the same component library, ensuring consistency across your entire product. Changes to components automatically propagate to all apps.

## Quick Start

```bash
# Clone and install
git clone <your-repo>
cd turborepo-shadcn
pnpm install

# Start all apps in development mode
pnpm dev
```

This will start:

- **Next.js** on [http://localhost:3000](http://localhost:3000)
- **Storybook** on [http://localhost:6006](http://localhost:6006)
- **Docusaurus** on [http://localhost:3002](http://localhost:3002)

## What's Included

| App/Package      | Description                | Port |
| ---------------- | -------------------------- | ---- |
| `apps/web`       | Next.js Todo App demo      | 3000 |
| `apps/storybook` | Component playground       | 6006 |
| `apps/docs`      | Documentation (Docusaurus) | 3002 |
| `packages/ui`    | Shared component library   | -    |

## Claude Code Integration

This monorepo includes custom [Claude Code](https://claude.ai/code) commands for automated workflows:

```bash
# Install a new component with story and docs
> /install-component badge

# List all components and their status
> /list-components
```

See the [Claude Code Integration](/guides/claude-code-integration) guide for details.

## Next Steps

- [Installation Guide](/getting-started/installation) - Full setup instructions
- [Project Structure](/getting-started/project-structure) - Understand the codebase
- [Components](/components/overview) - Explore available components
- [Adding New Apps](/apps/adding-apps) - Extend the monorepo
- [Claude Code Integration](/guides/claude-code-integration) - Automated workflows
