---
sidebar_position: 3
---

# Commands

All available commands for working with the monorepo.

## Development Commands

### Start All Apps

```bash
pnpm dev
```

Starts all apps in parallel:
- Next.js on port 3000
- Storybook on port 6006
- Docusaurus on port 3002

### Start Specific Apps

```bash
# Start only Next.js
pnpm dev:web

# Start only Storybook
pnpm dev:storybook

# Start only Docusaurus
pnpm dev:docs

# Using Turbo filter directly
pnpm turbo dev --filter=web
pnpm turbo dev --filter=storybook
pnpm turbo dev --filter=docs
```

### Start Multiple Specific Apps

```bash
# Start web and storybook only
pnpm turbo dev --filter=web --filter=storybook
```

## Build Commands

### Build Everything

```bash
pnpm build
```

Builds all apps and packages in dependency order.

### Build Specific Apps

```bash
# Build only the web app
pnpm turbo build --filter=web

# Build only storybook
pnpm turbo build --filter=storybook

# Build UI package
pnpm turbo build --filter=@monorepo-app/ui
```

### Build with Dependencies

```bash
# Build web and all its dependencies
pnpm turbo build --filter=web...
```

## Cache Commands

### Clear Turbo Cache

```bash
# Using turbo clean (if available)
pnpm turbo clean

# Or manually
rm -rf .turbo
```

### Force Rebuild (No Cache)

```bash
pnpm turbo build --force
```

## Package Management

### Install All Dependencies

```bash
pnpm install
```

### Add Dependency to Root

```bash
pnpm add -D <package> -w
```

### Add Dependency to Specific App/Package

```bash
# Add to web app
pnpm add <package> --filter=web

# Add dev dependency to UI package
pnpm add -D <package> --filter=@monorepo-app/ui
```

### Update Dependencies

```bash
# Update all packages
pnpm update

# Update specific package across workspace
pnpm update <package> -r
```

## Workspace Commands

### List All Packages

```bash
pnpm ls -r --depth -1
```

### Run Script in All Packages

```bash
pnpm -r <script>
```

### Run Script in Specific Package

```bash
pnpm --filter=<package-name> <script>
```

## Turborepo Commands

### View Dependency Graph

```bash
pnpm turbo build --graph
```

This generates a visualization of the dependency graph.

### Dry Run (See What Would Run)

```bash
pnpm turbo build --dry-run
```

### Run with Verbose Output

```bash
pnpm turbo build --verbosity=2
```

## Useful Shortcuts

Add these to your root `package.json` for convenience:

```json
{
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "dev:web": "turbo dev --filter=web",
    "dev:storybook": "turbo dev --filter=storybook",
    "dev:docs": "turbo dev --filter=docs",
    "build:web": "turbo build --filter=web",
    "build:storybook": "turbo build --filter=storybook",
    "build:docs": "turbo build --filter=docs",
    "clean": "turbo clean && rm -rf node_modules"
  }
}
```

## Quick Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps |
| `pnpm build` | Build all apps |
| `pnpm dev:web` | Start Next.js only |
| `pnpm dev:storybook` | Start Storybook only |
| `pnpm dev:docs` | Start Docusaurus only |
| `pnpm install` | Install dependencies |
| `pnpm turbo build --force` | Build without cache |
| `pnpm turbo build --filter=<name>` | Build specific app |
