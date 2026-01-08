---
sidebar_position: 3
---

# Storybook

The `apps/storybook` directory contains the Storybook application for component documentation and visual testing.

## Overview

- **Framework**: Storybook 8 with React + Vite
- **Port**: 6006
- **Purpose**: Component playground and documentation

## Directory Structure

```
apps/storybook/
├── .storybook/
│   ├── main.ts             # Storybook configuration
│   ├── preview.ts          # Story decorators and parameters
│   └── globals.css         # Tailwind styles for stories
├── stories/
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   ├── Card.stories.tsx
│   └── Checkbox.stories.tsx
├── package.json
├── tailwind.config.ts
├── postcss.config.js
└── tsconfig.json
```

## Configuration

### `.storybook/main.ts`

```ts
import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@monorepo-app/ui": join(__dirname, "../../../packages/ui/src"),
        },
      },
    };
  },
};

export default config;
```

Key points:
- Uses `@storybook/react-vite` for fast builds
- Alias resolves `@monorepo-app/ui` to the source files
- Stories are located in `../stories/`

### `.storybook/preview.ts`

```ts
import type { Preview } from "@storybook/react";
import "./globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0f172a" },
      ],
    },
  },
};

export default preview;
```

### `.storybook/globals.css`

Includes Tailwind and CSS variables:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... other CSS variables */
  }
}
```

## Writing Stories

### Basic Story Structure

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@monorepo-app/ui";

const meta: Meta<typeof Button> = {
  title: "UI/Button",           // Sidebar location
  component: Button,             // Component to document
  parameters: {
    layout: "centered",          // Center in canvas
  },
  tags: ["autodocs"],            // Generate docs page
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Individual stories
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};
```

### Story with Custom Render

```tsx
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
```

### Interactive Story

```tsx
import { useState } from "react";

export const Interactive: Story = {
  render: function InteractiveCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={checked}
          onCheckedChange={setChecked}
        />
        <span>{checked ? "Checked" : "Unchecked"}</span>
      </div>
    );
  },
};
```

## Running Storybook

```bash
# Development
pnpm dev:storybook

# Or
pnpm turbo dev --filter=storybook
```

Open [http://localhost:6006](http://localhost:6006).

## Building Storybook

```bash
# Build static site
pnpm turbo build --filter=storybook
```

Output is in `apps/storybook/storybook-static/`.

### Deploy to Static Hosting

The built output can be deployed to any static hosting:

```bash
# Example: Deploy to Netlify
cd apps/storybook/storybook-static
netlify deploy --prod
```

## Adding New Stories

1. Create a new file in `apps/storybook/stories/`:

```tsx
// stories/Badge.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@monorepo-app/ui";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};
```

2. The story appears automatically in Storybook sidebar.

## Story Organization

Organize stories using the `title` property:

```tsx
// Flat structure
title: "Button"           // Appears at root

// Nested structure
title: "UI/Button"        // Under "UI" category
title: "Forms/Input"      // Under "Forms" category
title: "Layout/Card"      // Under "Layout" category
```

## Addons

Included addons:

- **@storybook/addon-essentials**: Controls, actions, viewport, backgrounds, docs
- **@storybook/addon-links**: Link between stories
- **@storybook/addon-interactions**: Test interactions

### Using Controls

ArgTypes generate automatic controls:

```tsx
argTypes: {
  variant: {
    control: "select",
    options: ["default", "secondary"],
  },
  size: {
    control: "radio",
    options: ["sm", "md", "lg"],
  },
  disabled: {
    control: "boolean",
  },
  label: {
    control: "text",
  },
},
```

### Using Actions

Log interactions:

```tsx
import { action } from "@storybook/addon-actions";

export const WithAction: Story = {
  args: {
    onClick: action("clicked"),
  },
};
```

## Best Practices

1. **One component per story file**: Keep stories focused
2. **Use autodocs**: Add `tags: ["autodocs"]` for automatic documentation
3. **Cover all variants**: Create stories for each variant/state
4. **Add descriptions**: Document props with JSDoc comments
5. **Test interactions**: Use the interactions addon for behavior testing
