---
sidebar_position: 6
---

# Avatar

An image element with a fallback for representing the user.

## Import

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@monorepo-app/ui";
```

## Basic Usage

```tsx
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

## Components

The Avatar is composed of three parts:

- **Avatar** - The container component
- **AvatarImage** - The image element
- **AvatarFallback** - Displayed when the image fails to load or is not provided

## With Fallback

When the image fails to load, the fallback content is displayed:

```tsx
<Avatar>
  <AvatarImage src="https://invalid-url.com/image.png" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Fallback Only

You can use the avatar without an image:

```tsx
<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

## Custom Sizes

Override the default size using className:

```tsx
<Avatar className="h-8 w-8">
  <AvatarImage src="/avatar.png" alt="Small" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar className="h-14 w-14">
  <AvatarImage src="/avatar.png" alt="Large" />
  <AvatarFallback>LG</AvatarFallback>
</Avatar>

<Avatar className="h-20 w-20">
  <AvatarImage src="/avatar.png" alt="Extra Large" />
  <AvatarFallback>XL</AvatarFallback>
</Avatar>
```

## Custom Fallback Colors

Customize the fallback appearance:

```tsx
<Avatar>
  <AvatarFallback className="bg-red-500 text-white">RD</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback className="bg-blue-500 text-white">BL</AvatarFallback>
</Avatar>
```

## Avatar Group

Create overlapping avatar groups:

```tsx
<div className="flex -space-x-4">
  <Avatar className="border-2 border-background">
    <AvatarImage src="/user1.png" alt="User 1" />
    <AvatarFallback>U1</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback className="bg-blue-500 text-white">U2</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback className="bg-green-500 text-white">U3</AvatarFallback>
  </Avatar>
  <Avatar className="border-2 border-background">
    <AvatarFallback className="bg-purple-500 text-white">+5</AvatarFallback>
  </Avatar>
</div>
```

## Full Example

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@monorepo-app/ui";

export default function UserProfile() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="John Doe"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-muted-foreground">john@example.com</p>
      </div>
    </div>
  );
}
```

## Props

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>` | - | All Radix Avatar Root props |

### AvatarImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | - | Alt text for accessibility |
| `className` | `string` | - | Additional CSS classes |
| `...props` | `React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>` | - | All Radix Avatar Image props |

### AvatarFallback

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `delayMs` | `number` | - | Delay before showing fallback |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Fallback content (usually initials) |
| `...props` | `React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>` | - | All Radix Avatar Fallback props |

## Accessibility

- Uses Radix UI Avatar primitive for proper accessibility
- `alt` attribute on AvatarImage for screen readers
- Fallback content provides text alternative when image is unavailable
- Supports keyboard navigation when used in interactive contexts

## Source Code

Located at: `packages/ui/src/components/ui/avatar.tsx`
