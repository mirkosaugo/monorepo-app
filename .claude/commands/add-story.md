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

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "@monorepo-app/ui";

const meta: Meta<typeof ComponentName> = {
  title: "UI/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Define controls for each prop
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
// Add interactive stories with render functions if needed
```

## Requirements

- Cover ALL variants documented in the component
- Include proper TypeScript types
- Use `@monorepo-app/ui` for imports
- Follow existing story patterns in the project
