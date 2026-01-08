---
sidebar_position: 2
---

# Development Workflow

This guide covers the recommended development workflow for working with this monorepo.

## Daily Development

### Starting Your Day

```bash
# Pull latest changes
git pull

# Install any new dependencies
pnpm install

# Start development servers
pnpm dev
```

### Working on a Feature

1. **Create a branch**:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Start relevant apps**:
   ```bash
   # If working on UI components
   pnpm dev:storybook

   # If working on the web app
   pnpm dev:web

   # If working on both
   pnpm turbo dev --filter=web --filter=storybook
   ```

3. **Make changes and verify**:
   - Components: Check in Storybook
   - App features: Check in the app
   - Styling: Check both places

4. **Commit your work**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

## Component Development Workflow

### 1. Create Component in UI Package

```tsx
// packages/ui/src/components/ui/badge.tsx
import { cn } from "../../lib/utils";

export function Badge({ children, className }) {
  return (
    <span className={cn("badge-styles", className)}>
      {children}
    </span>
  );
}
```

### 2. Export from Index

```tsx
// packages/ui/src/index.ts
export { Badge } from "./components/ui/badge";
```

### 3. Create Storybook Story

```tsx
// apps/storybook/stories/Badge.stories.tsx
import { Badge } from "@monorepo-app/ui";

export default { title: "UI/Badge", component: Badge };
export const Default = { args: { children: "Badge" } };
```

### 4. Verify in Storybook

```bash
pnpm dev:storybook
```

Open [http://localhost:6006](http://localhost:6006) and check the component.

### 5. Use in App

```tsx
// apps/web/app/page.tsx
import { Badge } from "@monorepo-app/ui";

export default function Page() {
  return <Badge>New</Badge>;
}
```

### 6. Verify in App

```bash
pnpm dev:web
```

Open [http://localhost:3000](http://localhost:3000) and check the app.

## Hot Reloading

Changes automatically reflect across the monorepo:

1. **Edit a component** in `packages/ui/`
2. **Storybook** updates automatically
3. **Next.js app** updates automatically

No restart needed!

## Testing Changes

### Before Committing

```bash
# Build everything to catch errors
pnpm build

# Run linting (if configured)
pnpm lint
```

### Verify Specific Apps

```bash
# Build only what you changed
pnpm turbo build --filter=web
pnpm turbo build --filter=storybook
```

## Git Workflow

### Branch Naming

```
feature/add-button-variants
fix/checkbox-disabled-state
docs/update-readme
refactor/simplify-card-component
```

### Commit Messages

Follow conventional commits:

```
feat: add Badge component
fix: correct checkbox disabled styling
docs: add installation guide
refactor: simplify Button variants
chore: update dependencies
```

### Pull Request Process

1. **Create PR** with descriptive title
2. **Build passes**: `pnpm build` succeeds
3. **Visual review**: Check Storybook if components changed
4. **Code review**: Get approval
5. **Merge**: Squash or rebase

## Debugging

### Check Build Output

```bash
# Verbose build
pnpm turbo build --verbosity=2

# Dry run to see what would build
pnpm turbo build --dry-run
```

### Clear Cache

```bash
rm -rf .turbo node_modules/.cache
pnpm install
pnpm build
```

### Check Dependency Graph

```bash
pnpm turbo build --graph
```

## Adding Dependencies

### To a Specific Package

```bash
# Add to UI package
pnpm add lodash --filter=@monorepo-app/ui

# Add dev dependency to web app
pnpm add -D @testing-library/react --filter=web
```

### To Root (Dev Tools)

```bash
pnpm add -D prettier -w
```

### Updating Dependencies

```bash
# Update all packages
pnpm update -r

# Update specific package everywhere
pnpm update react -r
```

## Environment Variables

### Local Development

Create `.env.local` in each app:

```bash
# apps/web/.env.local
DATABASE_URL=postgresql://localhost/mydb
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Sharing Across Apps

For shared env vars, create at root and reference:

```bash
# .env
SHARED_API_KEY=xxx
```

## Performance Tips

### 1. Run Only What You Need

```bash
# Bad: runs everything
pnpm dev

# Good: runs only what you're working on
pnpm dev:web
```

### 2. Use Cache

Don't run `--force` unless necessary. Let Turborepo cache work.

### 3. Parallel Development

Open multiple terminals:
- Terminal 1: `pnpm dev:web`
- Terminal 2: `pnpm dev:storybook`

Both can run simultaneously on different ports.

### 4. Incremental Builds

After initial build, subsequent builds are much faster:

```bash
# First build: ~30 seconds
pnpm build

# Second build (no changes): ~1 second (cached)
pnpm build

# After small change: ~5 seconds (partial rebuild)
pnpm build
```

## Common Tasks

### Add a New Page to Web App

1. Create file in `apps/web/app/`:
   ```tsx
   // apps/web/app/about/page.tsx
   export default function About() {
     return <h1>About</h1>;
   }
   ```

2. Visit [http://localhost:3000/about](http://localhost:3000/about)

### Add a New Component

See [Adding Components](/components/adding-components)

### Add a New App

See [Adding Apps](/apps/adding-apps)

### Add a New Package

See [Adding Packages](/packages/adding-packages)

## Troubleshooting

### Import Errors

1. Check `package.json` has the dependency
2. Run `pnpm install`
3. Check `tsconfig.json` paths

### Styling Not Working

1. Check Tailwind `content` includes the package
2. Verify CSS variables are defined
3. Clear Next.js cache: `rm -rf apps/web/.next`

### Build Failures

1. Run `pnpm turbo build --verbosity=2`
2. Check the specific error
3. Fix in the failing package
4. Rebuild

### Type Errors

1. Check TypeScript version matches across packages
2. Run `pnpm turbo build --filter=@monorepo-app/ui` first
3. Restart TypeScript server in IDE
