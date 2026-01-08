---
description: Install a shadcn/ui component with Storybook story and Docusaurus documentation
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

## Step 4: Create Storybook story

Create a new file at `apps/storybook/stories/{PascalCaseName}.stories.tsx`.

Use this template, adapting it based on the component's props and variants:

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

## Step 5: Create Docusaurus documentation

Create a new file at `apps/docs/docs/components/{kebab-case-name}.md`.

Use this template:

```markdown
---
sidebar_position: {next available position}
---

# ComponentName

Brief description of what this component does and when to use it.

## Import

\`\`\`tsx
import { ComponentName } from "@monorepo-app/ui";
\`\`\`

## Basic Usage

\`\`\`tsx
<ComponentName>Example</ComponentName>
\`\`\`

## Variants

{If the component has variants, document each one with code examples}

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | type | default | description |

## Examples

### Example 1 Title

\`\`\`tsx
// Full example code
\`\`\`

## Accessibility

- List accessibility features
- Keyboard navigation support
- ARIA attributes used

## Source Code

Located at: \`packages/ui/src/components/ui/{component-name}.tsx\`
```

## Step 6: Verify the installation

Run the build to ensure everything works:

```bash
pnpm build
```

## Step 7: Report completion

After completing all steps, provide a summary:

1. Component installed: `$ARGUMENTS`
2. Exports added to `packages/ui/src/index.ts`
3. Storybook story created at `apps/storybook/stories/...`
4. Documentation created at `apps/docs/docs/components/...`
5. Build status: success/failure

If any step fails, explain the error and suggest how to fix it.

## Important Notes

- Always use `@monorepo-app/ui` as the import namespace
- Follow existing code patterns in the repository
- Make stories comprehensive with all variants
- Documentation should be clear and include all props
- Run the build at the end to catch any errors
