---
sidebar_position: 2
---

# UI Library (@monorepo-app/ui)

The `packages/ui` directory contains the shared component library built with shadcn/ui and Tailwind CSS.

## Overview

- **Package name**: `@monorepo-app/ui`
- **Location**: `packages/ui/`
- **Tech**: React, TypeScript, Tailwind CSS, shadcn/ui

## Directory Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       └── checkbox.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── globals.css
│   └── index.ts
├── package.json
├── tailwind.config.ts
├── postcss.config.js
└── tsconfig.json
```

## Package Configuration

### package.json

```json
{
  "name": "@monorepo-app/ui",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./globals.css": "./src/globals.css"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
```

Key points:
- `main` and `types` point to source files (no build step needed)
- `exports` defines public API
- React is a `peerDependency` (provided by consuming apps)

### Exports (index.ts)

```tsx
// Components
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button";
export { Input, type InputProps } from "./components/ui/input";
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card";
export { Checkbox, type CheckboxProps } from "./components/ui/checkbox";

// Utilities
export { cn } from "./lib/utils";
```

## Using the Package

### Installation

Already included in workspace. Just add to your app's `package.json`:

```json
{
  "dependencies": {
    "@monorepo-app/ui": "workspace:*"
  }
}
```

### Importing Components

```tsx
import { Button, Input, Card } from "@monorepo-app/ui";
```

### Importing Utilities

```tsx
import { cn } from "@monorepo-app/ui";

function MyComponent({ className }) {
  return <div className={cn("base-styles", className)} />;
}
```

## The `cn` Utility

The `cn` function merges Tailwind CSS classes intelligently:

```tsx
// packages/ui/src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Why Use `cn`?

```tsx
// Without cn - classes conflict
<div className="p-4 p-8" />  // Both classes apply (unpredictable)

// With cn - last wins correctly
<div className={cn("p-4", "p-8")} />  // Only p-8 applies

// Conditional classes
<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)} />
```

## Tailwind Configuration

### packages/ui/tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... more colors
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
```

## CSS Variables

Components use CSS variables for theming. These are defined in each app's `globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

This allows apps to customize the theme without modifying the component library.

## Dependencies Explained

### class-variance-authority (cva)

Creates variant-based component APIs:

```tsx
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        lg: "large-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);
```

### clsx

Conditionally joins class names:

```tsx
clsx("foo", true && "bar", false && "baz")  // "foo bar"
```

### tailwind-merge

Intelligently merges Tailwind classes:

```tsx
twMerge("p-4 p-8")  // "p-8"
twMerge("text-red-500 text-blue-500")  // "text-blue-500"
```

## Consuming App Configuration

Apps using `@monorepo-app/ui` must:

1. **Include UI in Tailwind content**:
```ts
content: [
  "./app/**/*.{ts,tsx}",
  "../../packages/ui/src/**/*.{ts,tsx}",  // Add this!
],
```

2. **Transpile the package** (Next.js):
```js
const nextConfig = {
  transpilePackages: ["@monorepo-app/ui"],
};
```

3. **Define CSS variables** in `globals.css`

4. **Configure path aliases** in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@monorepo-app/ui": ["../../packages/ui/src"]
    }
  }
}
```

## Adding New Components

See the [Adding Components](/components/adding-components) guide for detailed instructions on extending the library.
