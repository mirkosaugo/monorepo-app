---
sidebar_position: 1
---

# How Turborepo Works

This guide explains the core concepts of Turborepo and how it optimizes the monorepo workflow.

## What is Turborepo?

Turborepo is a high-performance build system for JavaScript/TypeScript monorepos. It provides:

- **Caching**: Skip work that's already been done
- **Parallelization**: Run tasks concurrently
- **Task Pipelines**: Define task dependencies

## Core Concepts

### Tasks

Tasks are the operations you run on your packages (build, test, lint, etc.). Defined in `turbo.json`:

```json
{
  "tasks": {
    "build": {},
    "test": {},
    "lint": {}
  }
}
```

### Pipelines

Pipelines define how tasks relate to each other:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
```

### The `^` Operator

The `^` prefix means "run this task on dependencies first":

```json
{
  "build": {
    "dependsOn": ["^build"]
  }
}
```

This ensures `@monorepo-app/ui` is built before `apps/web` (which depends on it).

### Outputs

Outputs tell Turborepo what to cache:

```json
{
  "build": {
    "outputs": [".next/**", "dist/**"]
  }
}
```

When you run `turbo build` again with no changes, Turborepo restores cached outputs instantly.

## Execution Flow

When you run `pnpm dev` (which calls `turbo dev`):

```
1. Turborepo reads turbo.json
2. Analyzes package.json files to find workspaces
3. Builds dependency graph
4. Determines task execution order
5. Runs tasks in parallel where possible
6. Caches outputs for future runs
```

## Caching

### How Caching Works

Turborepo creates a hash based on:
- Source files
- Environment variables
- Dependencies
- Task configuration

If the hash matches a previous run, cached outputs are restored.

### Cache Hit Example

```bash
$ pnpm build

@monorepo-app/ui:build: cache hit, replaying logs
@monorepo-app/ui:build:
@monorepo-app/ui:build: > @monorepo-app/ui@0.0.1 build
@monorepo-app/ui:build: > tsc
@monorepo-app/ui:build:

web:build: cache hit, replaying logs
...
```

### Cache Miss

When files change, Turborepo detects this and rebuilds:

```bash
$ pnpm build

@monorepo-app/ui:build: cache miss, executing
...
```

### Local Cache

By default, cache is stored in `.turbo/` directory:

```
.turbo/
└── cache/
    ├── abc123...   # Cached build output
    └── def456...   # Another cached output
```

### Clearing Cache

```bash
# Clear turbo cache
rm -rf .turbo

# Or force a fresh build
pnpm turbo build --force
```

## Dependency Graph

Turborepo automatically builds a dependency graph:

```
                    ┌─────────────┐
                    │  @monorepo-app/ui   │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │    web      │ │  storybook  │ │    docs     │
    └─────────────┘ └─────────────┘ └─────────────┘
```

### Visualizing the Graph

```bash
pnpm turbo build --graph
```

This generates a visual representation of your dependency graph.

## Filtering

Run tasks on specific packages:

```bash
# Single package
pnpm turbo build --filter=web

# Multiple packages
pnpm turbo build --filter=web --filter=storybook

# Package and its dependencies
pnpm turbo build --filter=web...

# All packages that depend on @monorepo-app/ui
pnpm turbo build --filter=...@monorepo-app/ui
```

## Environment Variables

Include environment variables in the cache key:

```json
{
  "tasks": {
    "build": {
      "env": ["NODE_ENV", "API_URL"]
    }
  }
}
```

Changes to these variables will invalidate the cache.

## Persistent Tasks

For development servers that don't exit:

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- `cache: false` - Don't cache dev server output
- `persistent: true` - Keep running (don't consider task "done")

## Our Configuration Explained

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        ".next/**",
        "!.next/cache/**",
        "dist/**",
        "storybook-static/**"
      ]
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

### Build Task
- `dependsOn: ["^build"]` - Build dependencies first
- `outputs` - Cache Next.js, dist, and Storybook outputs
- `!.next/cache/**` - Don't cache Next.js's own cache

### Dev Task
- `cache: false` - Never cache (always fresh)
- `persistent: true` - Runs continuously

### Lint Task
- `dependsOn: ["^build"]` - Ensure code is built before linting

## Performance Tips

### 1. Use Filtering in Development

Instead of running everything:
```bash
pnpm dev
```

Run only what you need:
```bash
pnpm turbo dev --filter=web
```

### 2. Leverage Caching

Don't clear cache unnecessarily. Let Turborepo determine what needs rebuilding.

### 3. Define Outputs Correctly

Missing outputs = broken cache:
```json
{
  "build": {
    "outputs": ["dist/**"]  // Make sure ALL outputs are listed
  }
}
```

### 4. Use Remote Caching (Optional)

Share cache across team members:
```bash
npx turbo login
npx turbo link
```

## Common Issues

### Cache Not Working

1. Check outputs are defined correctly
2. Verify files haven't changed
3. Run with `--verbosity=2` for details

### Wrong Build Order

Ensure dependencies are declared in `package.json`:
```json
{
  "dependencies": {
    "@monorepo-app/ui": "workspace:*"
  }
}
```

### Circular Dependencies

Turborepo will error on circular dependencies. Fix by restructuring packages.

## Further Reading

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Task Configuration](https://turbo.build/repo/docs/reference/configuration)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
