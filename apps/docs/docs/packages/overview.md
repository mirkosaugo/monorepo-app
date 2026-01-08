---
sidebar_position: 1
---

# Packages Overview

The `packages/` directory contains shared code that can be used across multiple apps in the monorepo.

## Current Packages

| Package | Description | Import |
|---------|-------------|--------|
| [@monorepo-app/ui](/packages/ui-library) | Shared UI component library | `@monorepo-app/ui` |

## Package vs App

**Packages** are shared libraries that:
- Are not deployed independently
- Export code for other packages/apps to consume
- Are listed in `dependencies` of consuming apps

**Apps** are deployable applications that:
- Run independently
- Can depend on packages
- Have their own build/start scripts

## How Packages Work in Turborepo

### Workspace Protocol

Packages are linked using the workspace protocol:

```json
{
  "dependencies": {
    "@monorepo-app/ui": "workspace:*"
  }
}
```

The `workspace:*` syntax tells pnpm to link to the local package instead of downloading from npm.

### Dependency Graph

When you run `pnpm build`, Turborepo:

1. Analyzes dependencies between packages and apps
2. Builds packages first (in dependency order)
3. Then builds apps that depend on those packages

```
packages/ui → apps/web
           → apps/storybook
           → apps/docs (if using @monorepo-app/ui)
```

### Build Order

In `turbo.json`, the `dependsOn: ["^build"]` setting ensures packages are built before apps:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```

The `^` prefix means "build dependencies first".

## Creating New Packages

See the [Adding Packages](/packages/adding-packages) guide for step-by-step instructions.

## Package Types

Common package types in a monorepo:

### UI Components (`@monorepo-app/ui`)
Shared React components with styling.

### Utilities (`@monorepo-app/utils`)
Shared helper functions.

### Configuration (`@monorepo-app/config`)
Shared configuration (ESLint, Tailwind, TypeScript).

### Types (`@monorepo-app/types`)
Shared TypeScript type definitions.

### API Client (`@monorepo-app/api`)
Shared API client code.

## Best Practices

1. **Keep packages focused**: One concern per package
2. **Export explicitly**: Define what's public in `index.ts`
3. **Version consistently**: Use the same version for related packages
4. **Document exports**: Add JSDoc comments to exported functions
5. **Test packages**: Packages should have their own tests
