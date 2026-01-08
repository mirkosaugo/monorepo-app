---
sidebar_position: 2
---

# Button

A versatile button component with multiple variants and sizes.

## Import

```tsx
import { Button } from "@monorepo-app/ui";
```

## Basic Usage

```tsx
<Button>Click me</Button>
```

## Variants

The Button component supports 6 variants:

```tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Default
The primary action button with solid background.

### Destructive
For dangerous actions like delete operations.

### Outline
Secondary actions with a border and transparent background.

### Secondary
Alternative to the default style with muted colors.

### Ghost
Minimal styling, shows on hover.

### Link
Appears as a text link with underline on hover.

## Sizes

Three size options are available:

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🚀</Button>  {/* Square button for icons */}
```

## States

### Disabled

```tsx
<Button disabled>Disabled</Button>
```

### Loading (Custom Implementation)

```tsx
<Button disabled>
  <span className="animate-spin mr-2">⏳</span>
  Loading...
</Button>
```

## With Icons

```tsx
<Button>
  <span className="mr-2">📧</span>
  Send Email
</Button>

<Button size="icon">
  <span>🔍</span>
</Button>
```

## Full Example

```tsx
import { Button } from "@monorepo-app/ui";

export default function ActionButtons() {
  return (
    <div className="flex gap-4">
      <Button onClick={() => console.log("Saved!")}>
        Save Changes
      </Button>

      <Button variant="outline" onClick={() => console.log("Cancelled")}>
        Cancel
      </Button>

      <Button variant="destructive" onClick={() => confirm("Delete?")}>
        Delete
      </Button>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Button content |
| `...props` | `ButtonHTMLAttributes` | - | All native button props |

## Customization

Override styles using the `className` prop:

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">
  Custom Color
</Button>
```

## Accessibility

- Uses native `<button>` element
- Supports keyboard navigation
- Includes focus ring for visibility
- Disabled state removes from tab order

## Source Code

Located at: `packages/ui/src/components/ui/button.tsx`

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```
