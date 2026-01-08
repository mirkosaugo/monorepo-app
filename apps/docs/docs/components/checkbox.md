---
sidebar_position: 5
---

# Checkbox

A checkbox component with label support and controlled state.

## Import

```tsx
import { Checkbox } from "@monorepo-app/ui";
```

## Basic Usage

```tsx
<Checkbox />
```

## With Label

```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-sm font-medium">
    Accept terms and conditions
  </label>
</div>
```

## States

### Checked by Default

```tsx
<Checkbox defaultChecked />
```

### Disabled

```tsx
<Checkbox disabled />
<Checkbox disabled defaultChecked />
```

### Controlled

```tsx
import { useState } from "react";
import { Checkbox } from "@monorepo-app/ui";

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="controlled"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label htmlFor="controlled">
        {checked ? "Checked" : "Unchecked"}
      </label>
    </div>
  );
}
```

## Real-World Examples

### Todo List

```tsx
import { useState } from "react";
import { Checkbox } from "@monorepo-app/ui";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Build a todo app", completed: false },
    { id: 3, text: "Deploy to production", completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center space-x-2">
          <Checkbox
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(todo.id)}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className={todo.completed ? "line-through text-muted-foreground" : ""}
          >
            {todo.text}
          </label>
        </div>
      ))}
    </div>
  );
}
```

### Form with Multiple Checkboxes

```tsx
import { useState } from "react";
import { Checkbox, Button } from "@monorepo-app/ui";

function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    newsletter: false,
    updates: true,
    marketing: false,
  });

  const handleChange = (key: keyof typeof preferences) => (checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <form className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="newsletter"
            checked={preferences.newsletter}
            onCheckedChange={handleChange("newsletter")}
          />
          <label htmlFor="newsletter" className="text-sm">
            Subscribe to newsletter
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="updates"
            checked={preferences.updates}
            onCheckedChange={handleChange("updates")}
          />
          <label htmlFor="updates" className="text-sm">
            Receive product updates
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="marketing"
            checked={preferences.marketing}
            onCheckedChange={handleChange("marketing")}
          />
          <label htmlFor="marketing" className="text-sm">
            Receive marketing emails
          </label>
        </div>
      </div>

      <Button type="submit">Save Preferences</Button>
    </form>
  );
}
```

### Terms and Conditions

```tsx
import { useState } from "react";
import { Checkbox, Button } from "@monorepo-app/ui";

function TermsForm() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={setAccepted}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm leading-relaxed">
          I agree to the{" "}
          <a href="/terms" className="text-primary underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary underline">
            Privacy Policy
          </a>
        </label>
      </div>

      <Button disabled={!accepted}>
        Continue
      </Button>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled) |
| `onCheckedChange` | `(checked: boolean) => void` | - | Callback when checked state changes |
| `disabled` | `boolean` | `false` | Disable the checkbox |
| `className` | `string` | - | Additional CSS classes |
| `id` | `string` | - | ID for label association |
| `...props` | `InputHTMLAttributes` | - | All native checkbox props |

## Customization

```tsx
// Larger checkbox
<Checkbox className="h-5 w-5" />

// Custom accent color
<Checkbox className="accent-purple-500" />
```

## Accessibility

- Uses native `<input type="checkbox">`
- Associates with `<label>` via `id`
- Supports keyboard navigation (Space to toggle)
- Focus ring for visibility
- Disabled state properly communicated

## Source Code

Located at: `packages/ui/src/components/ui/checkbox.tsx`
