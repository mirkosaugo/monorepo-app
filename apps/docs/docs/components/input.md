---
sidebar_position: 3
---

# Input

A styled text input field component.

## Import

```tsx
import { Input } from "@monorepo-app/ui";
```

## Basic Usage

```tsx
<Input placeholder="Enter your name..." />
```

## Types

The Input supports all standard HTML input types:

```tsx
<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="123" />
<Input type="search" placeholder="Search..." />
```

## States

### Disabled

```tsx
<Input disabled placeholder="Disabled input" />
```

### With Default Value

```tsx
<Input defaultValue="Default text" />
```

### Controlled

```tsx
import { useState } from "react";
import { Input } from "@monorepo-app/ui";

function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type here..."
    />
  );
}
```

## With Label

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input
    id="email"
    type="email"
    placeholder="email@example.com"
  />
</div>
```

## With Error State

```tsx
<div className="space-y-2">
  <label htmlFor="username" className="text-sm font-medium">
    Username
  </label>
  <Input
    id="username"
    className="border-red-500 focus-visible:ring-red-500"
    placeholder="Enter username"
  />
  <p className="text-sm text-red-500">Username is required</p>
</div>
```

## Full Example

```tsx
import { useState } from "react";
import { Input, Button } from "@monorepo-app/ui";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | Input type (text, email, password, etc.) |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Disable the input |
| `className` | `string` | - | Additional CSS classes |
| `value` | `string` | - | Controlled value |
| `defaultValue` | `string` | - | Initial value (uncontrolled) |
| `onChange` | `function` | - | Change handler |
| `...props` | `InputHTMLAttributes` | - | All native input props |

## Customization

```tsx
// Wider input
<Input className="w-full" />

// Custom border color
<Input className="border-blue-500 focus-visible:ring-blue-500" />

// Different height
<Input className="h-12 text-lg" />
```

## Accessibility

- Uses native `<input>` element
- Supports all ARIA attributes
- Works with `<label>` elements via `id`
- Focus states are clearly visible

## Source Code

Located at: `packages/ui/src/components/ui/input.tsx`
