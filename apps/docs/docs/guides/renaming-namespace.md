---
sidebar_position: 3
---

# Renaming the Package Namespace

This guide explains how to change the package namespace (e.g., from `@monorepo-app` to `@your-company`) across the entire monorepo.

## Why Rename?

You might want to rename the namespace to:
- Match your company/organization name
- Follow your team's naming conventions
- Prepare for publishing to a private registry

## Files to Update

When renaming from `@monorepo-app` to your preferred namespace, you need to update these files:

### 1. Package Definition

**`packages/ui/package.json`**
```json
{
  "name": "@your-namespace/ui",  // Change this
  ...
}
```

### 2. App Dependencies

Update the dependency in each app that uses the UI package:

**`apps/web/package.json`**
```json
{
  "dependencies": {
    "@your-namespace/ui": "workspace:*"  // Change this
  }
}
```

**`apps/storybook/package.json`**
```json
{
  "dependencies": {
    "@your-namespace/ui": "workspace:*"  // Change this
  }
}
```

### 3. TypeScript Path Aliases

Update path aliases in each app's `tsconfig.json`:

**`apps/web/tsconfig.json`**
```json
{
  "compilerOptions": {
    "paths": {
      "@your-namespace/ui": ["../../packages/ui/src"],
      "@your-namespace/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

**`apps/storybook/tsconfig.json`**
```json
{
  "compilerOptions": {
    "paths": {
      "@your-namespace/ui": ["../../packages/ui/src"],
      "@your-namespace/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

### 4. Storybook Vite Alias

**`apps/storybook/.storybook/main.ts`**
```ts
viteFinal: async (config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@your-namespace/ui": join(__dirname, "../../../packages/ui/src"),
      },
    },
  };
},
```

### 5. Import Statements

Update all import statements in your source files:

```tsx
// Before
import { Button } from "@monorepo-app/ui";

// After
import { Button } from "@your-namespace/ui";
```

## Quick Find & Replace

You can use these commands to find and replace across the codebase:

### Using grep to find occurrences

```bash
# Find all files containing the old namespace
grep -r "@monorepo-app" --include="*.json" --include="*.ts" --include="*.tsx" -l
```

### Using sed to replace (macOS)

```bash
# Replace in package.json files
find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i '' 's/@monorepo-app/@your-namespace/g' {} \;

# Replace in TypeScript files
find . -name "*.ts" -o -name "*.tsx" -not -path "*/node_modules/*" | xargs sed -i '' 's/@monorepo-app/@your-namespace/g'
```

### Using sed to replace (Linux)

```bash
# Replace in package.json files
find . -name "package.json" -not -path "*/node_modules/*" -exec sed -i 's/@monorepo-app/@your-namespace/g' {} \;

# Replace in TypeScript files
find . \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -exec sed -i 's/@monorepo-app/@your-namespace/g' {} \;
```

## After Renaming

After making the changes:

1. **Delete node_modules and reinstall**:
   ```bash
   rm -rf node_modules apps/*/node_modules packages/*/node_modules
   pnpm install
   ```

2. **Clear Turborepo cache**:
   ```bash
   rm -rf .turbo
   ```

3. **Verify the build**:
   ```bash
   pnpm build
   ```

4. **Test development**:
   ```bash
   pnpm dev
   ```

## Adding More Packages

When adding new packages, follow the same naming convention:

```json
{
  "name": "@your-namespace/utils",
  "name": "@your-namespace/config",
  "name": "@your-namespace/types"
}
```

## Common Issues

### "Module not found" errors

Make sure:
1. The package name in `package.json` matches exactly
2. The `tsconfig.json` paths use the correct namespace
3. You ran `pnpm install` after changes

### Storybook not resolving imports

Check the alias in `.storybook/main.ts` matches your new namespace.

### IDE not recognizing imports

1. Restart your TypeScript server
2. In VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
