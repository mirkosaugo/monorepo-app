---
description: Install a shadcn/ui component with Storybook story
allowed-tools: Bash(cd:*), Bash(npx:*), Bash(pnpm:*), Read, Write, Edit, Glob, Grep
---

# Install shadcn/ui Component: $ARGUMENTS

You are installing the shadcn/ui component "$ARGUMENTS" in the monorepo. Follow these steps precisely:

## Step 1: Install the component using shadcn CLI

Run the following command from the `packages/ui` directory:

```bash
cd packages/ui && npx shadcn@latest add $ARGUMENTS
```

If prompted, accept the default options. If the component already exists, inform the user and ask if they want to overwrite it.

## Step 2: Read the installed component

After installation, read the component file to understand its exports:

```bash
# The component will be at packages/ui/src/components/ui/$ARGUMENTS.tsx
```

Identify:
- The main component name(s)
- Any variant exports (like `buttonVariants`)
- Any type exports

## Step 3: Update the UI package exports

Edit `packages/ui/src/index.ts` to add the new component export(s).

Follow the existing pattern in the file. For example:
```tsx
export { ComponentName, componentVariants, type ComponentProps } from "./components/ui/$ARGUMENTS";
```

## Step 4: Create Storybook story with documentation

Create a new file at `apps/storybook/stories/{PascalCaseName}.stories.tsx`.

**IMPORTANT:** The Storybook story serves as the primary documentation for the component. Include:
- A JSDoc comment with description and link to shadcn/ui docs
- A `docs.description.component` in parameters with a brief description and link to shadcn/ui

Use this template, adapting it based on the component's props and variants:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@monorepo-app/ui";

/**
 * Brief description of what this component does.
 *
 * Built on top of shadcn/ui ComponentName component.
 *
 * @see https://ui.shadcn.com/docs/components/{component-name}
 */
const meta: Meta<typeof ComponentName> = {
  title: "UI/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Brief description of the component and its main features. [View shadcn/ui docs](https://ui.shadcn.com/docs/components/{component-name})",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Add controls for the component's props
    // variant: { control: "select", options: ["default", "secondary"] },
    // disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

// Add more stories for different variants/states
```

Include stories for:
- Default state
- All variants (if applicable)
- Different sizes (if applicable)
- Disabled state (if applicable)
- Interactive examples with useState (if the component is interactive)
- An "AllVariants" or "AllStates" story showing all options at once

## Step 5: Verify the installation

Run the build to ensure everything works:

```bash
pnpm build
```

## Step 6: Report completion

After completing all steps, provide a summary:

1. Component installed: `$ARGUMENTS`
2. Exports added to `packages/ui/src/index.ts`
3. Storybook story created at `apps/storybook/stories/...`
4. Build status: success/failure

If any step fails, explain the error and suggest how to fix it.

## Important Notes

- Always use `@monorepo-app/ui` as the import namespace
- Follow existing code patterns in the repository
- Make stories comprehensive with all variants
- Always include the shadcn/ui documentation link in the story
- Run the build at the end to catch any errors
