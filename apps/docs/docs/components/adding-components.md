---
sidebar_position: 99
---

# Adding New Components

This guide explains how to add new shadcn/ui components to the monorepo using the official CLI.

## Prerequisites

First, you need to configure shadcn/ui in the UI package. Create a `components.json` file if it doesn't exist.

### Initial Setup (One-time)

Navigate to the UI package and initialize shadcn/ui:

```bash
cd packages/ui
npx shadcn@latest init
```

When prompted, configure:
- **Style**: Default
- **Base color**: Slate (or your preference)
- **CSS variables**: Yes
- **Tailwind config**: `tailwind.config.ts`
- **Components path**: `src/components`
- **Utilities path**: `src/lib/utils.ts`

This creates a `components.json` file:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "src/components",
    "utils": "src/lib/utils"
  }
}
```

## Adding a Component with CLI

### Step 1: Install the Component

From the `packages/ui` directory, use the shadcn CLI:

```bash
cd packages/ui
npx shadcn@latest add badge
```

This will:
1. Download the component to `src/components/ui/badge.tsx`
2. Install any required dependencies automatically

### Step 2: Export the Component

Add the component to `packages/ui/src/index.ts`:

```tsx
// Existing exports
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button";
export { Input, type InputProps } from "./components/ui/input";
// ... other exports

// Add new component
export { Badge, badgeVariants } from "./components/ui/badge";
```

### Step 3: Create a Storybook Story (Optional)

Create `apps/storybook/stories/Badge.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@monorepo-app/ui";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};
```

### Step 4: Use in Your App

```tsx
import { Badge } from "@monorepo-app/ui";

export default function MyComponent() {
  return (
    <div>
      <Badge>New</Badge>
      <Badge variant="secondary">Updated</Badge>
      <Badge variant="destructive">Deleted</Badge>
    </div>
  );
}
```

## Adding Multiple Components

You can add multiple components at once:

```bash
cd packages/ui
npx shadcn@latest add dialog alert-dialog dropdown-menu
```

## Available Components

See the full list of available components at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components).

Popular components:
- **Layout**: Card, Separator, Aspect Ratio
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Slider
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlay**: Dialog, Alert Dialog, Sheet, Popover, Tooltip
- **Navigation**: Tabs, Navigation Menu, Breadcrumb
- **Data Display**: Table, Avatar, Badge, Calendar

## Component Dependencies

Some components have dependencies on other components or libraries:

| Component | Dependencies |
|-----------|--------------|
| Dialog | Radix UI Dialog |
| Select | Radix UI Select |
| Toast | Radix UI Toast, Sonner |
| Calendar | react-day-picker, date-fns |
| Form | react-hook-form, zod |

The CLI automatically installs these dependencies.

## Updating Components

To update an existing component to the latest version:

```bash
cd packages/ui
npx shadcn@latest add button --overwrite
```

:::warning
Using `--overwrite` will replace any customizations you've made to the component.
:::

## Customizing Components

Since shadcn/ui components are copied to your codebase, you can customize them freely:

1. Open the component file in `packages/ui/src/components/ui/`
2. Modify the styles, variants, or behavior
3. Changes automatically reflect in all apps

### Example: Adding a New Button Variant

```tsx
// packages/ui/src/components/ui/button.tsx
const buttonVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "...",
        // Add custom variant
        success: "bg-green-500 text-white hover:bg-green-600",
      },
      // ...
    },
  }
);
```

## Troubleshooting

### "Cannot find module" after adding component

1. Run `pnpm install` from the root
2. Restart your dev server
3. Check the export in `packages/ui/src/index.ts`

### Component styles not working

Ensure your app's `tailwind.config.ts` includes the UI package:

```ts
content: [
  "./app/**/*.{ts,tsx}",
  "../../packages/ui/src/**/*.{ts,tsx}",  // Add this!
],
```

### CLI not working in monorepo

If the CLI has issues with paths, you can:
1. Run it from the `packages/ui` directory
2. Or specify the path: `npx shadcn@latest add button --path=packages/ui/src/components/ui`

## Checklist

When adding a new component:

- [ ] Run `npx shadcn@latest add <component>` from `packages/ui`
- [ ] Export from `packages/ui/src/index.ts`
- [ ] Create Storybook story (optional but recommended)
- [ ] Test in your app
- [ ] Run `pnpm build` to verify no errors
