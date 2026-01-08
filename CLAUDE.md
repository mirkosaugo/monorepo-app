# Monorepo app - Claude Code Instructions

This is a Turborepo monorepo with Next.js, Storybook, Docusaurus, and a shared UI component library based on shadcn/ui.

## Project Structure

```
monorepo-app/
├── apps/
│   ├── web/           # Next.js 14 application (port 3000)
│   ├── storybook/     # Storybook 8 (port 6006)
│   └── docs/          # Docusaurus 3 documentation (port 3002)
├── packages/
│   └── ui/            # Shared component library (@monorepo-app/ui)
└── .claude/
    └── commands/      # Custom Claude Code commands
```

## Package Namespace

The UI package namespace is `@monorepo-app/ui`. All imports should use this namespace:

```tsx
import { Button, Input, Card } from "@monorepo-app/ui";
```

## Common Commands

```bash
# Install dependencies
pnpm install

# Start all apps in parallel
pnpm dev

# Start specific apps
pnpm dev:web        # Next.js on port 3000
pnpm dev:storybook  # Storybook on port 6006
pnpm dev:docs       # Docusaurus on port 3002

# Build everything
pnpm build

# Build specific app
pnpm turbo build --filter=web
pnpm turbo build --filter=storybook
pnpm turbo build --filter=docs
```

## Adding New shadcn/ui Components

When adding a new shadcn/ui component, follow this workflow:

### 1. Install the component using shadcn CLI

```bash
cd packages/ui
npx shadcn@latest add <component-name>
```

### 2. Export from the UI package

Add the export to `packages/ui/src/index.ts`:

```tsx
export { ComponentName } from "./components/ui/component-name";
```

### 3. Create Storybook story with documentation

Create `apps/storybook/stories/ComponentName.stories.tsx`. The Storybook story serves as the primary documentation for the component - include a description and link to shadcn/ui docs:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@monorepo-app/ui";

/**
 * Brief description of the component.
 *
 * Built on top of shadcn/ui ComponentName component.
 *
 * @see https://ui.shadcn.com/docs/components/component-name
 */
const meta: Meta<typeof ComponentName> = {
  title: "UI/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Brief description. [View shadcn/ui docs](https://ui.shadcn.com/docs/components/component-name)",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // default props
  },
};
```

### 4. Verify the installation

```bash
pnpm build
```

## Code Style Guidelines

- Use TypeScript for all code
- Follow existing patterns in the codebase
- Use Tailwind CSS for styling
- Components should be accessible (ARIA attributes, keyboard navigation)
- Export types alongside components

## Important Files

- `packages/ui/src/index.ts` - UI package exports
- `apps/storybook/stories/` - Storybook stories (component documentation)
- `turbo.json` - Turborepo pipeline configuration

## Custom Claude Commands

Use `/install-component <name>` to automatically:

1. Install a shadcn/ui component
2. Export it from the UI package
3. Create a Storybook story with documentation

Use `/add-story <name>` to create a Storybook story for an existing component.
