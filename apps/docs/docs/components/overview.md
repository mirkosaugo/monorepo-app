---
sidebar_position: 1
---

# Components Overview

The `@monorepo-app/ui` package contains a collection of reusable UI components built with [shadcn/ui](https://ui.shadcn.com) and Tailwind CSS.

## Component Documentation

All components are documented in **Storybook** with interactive examples and links to the official shadcn/ui documentation.

```bash
pnpm dev:storybook
```

Then open [http://localhost:6006](http://localhost:6006) to explore all available components.

For detailed API documentation and examples, refer to the [shadcn/ui documentation](https://ui.shadcn.com/docs/components).

## Installation

The component library is already included in the monorepo. To use components in your app, ensure your `package.json` includes:

```json
{
  "dependencies": {
    "@monorepo-app/ui": "workspace:*"
  }
}
```

## Basic Usage

Import components from `@monorepo-app/ui`:

```tsx
import { Button, Input, Card, Checkbox } from "@monorepo-app/ui";

export default function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Tailwind Configuration

Each app using `@monorepo-app/ui` must include the package in its Tailwind content configuration:

```ts
// tailwind.config.ts
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",  // Include UI package!
  ],
  // ... rest of config
};
```

## CSS Variables

Components use CSS variables for theming. Include these in your app's global CSS:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }
}
```

## Utility Function

The `cn()` utility merges Tailwind classes intelligently:

```tsx
import { cn } from "@monorepo-app/ui";

function MyComponent({ className }) {
  return (
    <div className={cn("base-styles", className)}>
      Content
    </div>
  );
}
```

