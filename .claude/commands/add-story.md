---
description: Create a Storybook story for an existing component
allowed-tools: Read, Write, Glob, Grep
---

# Create Storybook Story for: $ARGUMENTS

Create a Storybook story for the component "$ARGUMENTS" that already exists in the UI package.

## Steps

1. **Read the component source**:
   - Find and read the component at `packages/ui/src/components/ui/$ARGUMENTS.tsx`
   - Identify all props, variants, and types

2. **Check if story already exists**:
   - Look for existing story at `apps/storybook/stories/`
   - If it exists, ask user if they want to overwrite

3. **Create the story file**:
   - Create `apps/storybook/stories/{PascalCaseName}.stories.tsx`
   - Include stories for all variants and states
   - Add interactive examples where appropriate

## Story Template

**IMPORTANT:** The Storybook story serves as the primary documentation for the component. Include:
- A JSDoc comment with description and link to shadcn/ui docs
- A `docs.description.component` in parameters with a brief description and link to shadcn/ui

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
    // Define controls for each prop
    // variant: { control: "select", options: ["default", "secondary"] },
    // disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// Add variant stories
// Add size stories if applicable
// Add state stories (disabled, loading, etc.)
// Add an "AllVariants" or "AllStates" story showing all options
// Add interactive stories with render functions if needed
```

## Requirements

- Cover ALL variants documented in the component
- Include proper TypeScript types
- Use `@monorepo-app/ui` for imports
- Always include the shadcn/ui documentation link
- Follow existing story patterns in the project
