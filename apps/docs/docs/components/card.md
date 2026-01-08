---
sidebar_position: 4
---

# Card

A container component with header, content, and footer sections.

## Import

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@monorepo-app/ui";
```

## Basic Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content area.</p>
  </CardContent>
  <CardFooter>
    <p>Card footer</p>
  </CardFooter>
</Card>
```

## Sub-Components

### Card

The main container with border, shadow, and rounded corners.

### CardHeader

Container for title and description with proper spacing.

### CardTitle

Large, bold heading for the card.

### CardDescription

Muted text below the title.

### CardContent

Main content area with padding.

### CardFooter

Bottom section, typically for actions.

## Examples

### Simple Card

```tsx
<Card className="w-[350px]">
  <CardContent className="pt-6">
    <p>A simple card with just content.</p>
  </CardContent>
</Card>
```

### Card with Form

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Button } from "@monorepo-app/ui";

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Enter your details below.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="space-y-2">
      <label htmlFor="name" className="text-sm font-medium">Name</label>
      <Input id="name" placeholder="John Doe" />
    </div>
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">Email</label>
      <Input id="email" type="email" placeholder="john@example.com" />
    </div>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Submit</Button>
  </CardFooter>
</Card>
```

### Notification Card

```tsx
<Card className="w-[350px]">
  <CardHeader className="pb-3">
    <CardTitle>Notifications</CardTitle>
    <CardDescription>You have 3 unread messages.</CardDescription>
  </CardHeader>
  <CardContent className="space-y-2">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <div className="flex-1">
          <p className="text-sm font-medium">New message #{i}</p>
          <p className="text-xs text-muted-foreground">2 minutes ago</p>
        </div>
      </div>
    ))}
  </CardContent>
</Card>
```

### Stats Card

```tsx
<Card>
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
    <span>💰</span>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">$45,231.89</div>
    <p className="text-xs text-muted-foreground">
      +20.1% from last month
    </p>
  </CardContent>
</Card>
```

## Props

All Card components accept standard HTML div attributes plus:

| Component | Props |
|-----------|-------|
| `Card` | `className`, all div attributes |
| `CardHeader` | `className`, all div attributes |
| `CardTitle` | `className`, all heading attributes |
| `CardDescription` | `className`, all paragraph attributes |
| `CardContent` | `className`, all div attributes |
| `CardFooter` | `className`, all div attributes |

## Customization

### Custom Width

```tsx
<Card className="w-full max-w-md">
  {/* content */}
</Card>
```

### No Shadow

```tsx
<Card className="shadow-none">
  {/* content */}
</Card>
```

### Interactive Card

```tsx
<Card className="cursor-pointer hover:shadow-lg transition-shadow">
  {/* content */}
</Card>
```

## Accessibility

- Uses semantic HTML (`<div>`, `<h3>`, `<p>`)
- Proper heading hierarchy with CardTitle
- Content is accessible to screen readers

## Source Code

Located at: `packages/ui/src/components/ui/card.tsx`
