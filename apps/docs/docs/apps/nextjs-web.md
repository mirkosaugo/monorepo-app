---
sidebar_position: 2
---

# Next.js Web App

The `apps/web` directory contains a Next.js 14 application demonstrating the use of `@monorepo-app/ui` components.

## Overview

- **Framework**: Next.js 14 with App Router
- **Port**: 3000
- **Features**: Todo App with CRUD operations

## Directory Structure

```
apps/web/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Home page (Todo App)
│   └── globals.css         # Global styles with CSS variables
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Key Configuration

### `next.config.js`

The most important setting for monorepo compatibility:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@monorepo-app/ui"],
};

module.exports = nextConfig;
```

This tells Next.js to transpile the `@monorepo-app/ui` package, which is necessary because it's written in TypeScript and not pre-compiled.

### `tailwind.config.ts`

Includes the UI package in the content paths:

```ts
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",  // Important!
  ],
  // ... theme configuration
};
```

### `tsconfig.json`

Path aliases for clean imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@monorepo-app/ui": ["../../packages/ui/src"],
      "@monorepo-app/ui/*": ["../../packages/ui/src/*"]
    }
  }
}
```

## Using UI Components

Import components directly from `@monorepo-app/ui`:

```tsx
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Checkbox,
} from "@monorepo-app/ui";

export default function Home() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My App</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text..." />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## The Todo App

The included Todo app (`app/page.tsx`) demonstrates:

- **State Management**: Using React's `useState` hook
- **Component Composition**: Combining Card, Input, Button, Checkbox
- **Event Handling**: Add, toggle, and delete todos
- **Conditional Rendering**: Empty state message
- **Styling**: Tailwind CSS with shadcn/ui theming

### Features

1. Add new todos with input field
2. Toggle completion with checkbox
3. Delete todos with button
4. View remaining/completed count
5. Keyboard support (Enter to add)

## Running the App

```bash
# Start development server
pnpm dev:web

# Or from root
pnpm turbo dev --filter=web
```

Open [http://localhost:3000](http://localhost:3000).

## Building

```bash
# Build for production
pnpm turbo build --filter=web

# Start production server
cd apps/web && pnpm start
```

## Adding New Pages

With the App Router, add new pages by creating files in the `app/` directory:

```
app/
├── page.tsx           # / (home)
├── about/
│   └── page.tsx       # /about
├── dashboard/
│   ├── page.tsx       # /dashboard
│   └── settings/
│       └── page.tsx   # /dashboard/settings
```

Example new page:

```tsx
// app/about/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@monorepo-app/ui";

export default function AboutPage() {
  return (
    <main className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the about page.</p>
        </CardContent>
      </Card>
    </main>
  );
}
```

## Adding API Routes

Create API routes in `app/api/`:

```tsx
// app/api/todos/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ todos: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ todo: body });
}
```

## Environment Variables

Create `.env.local` for local development:

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Access in code:
- Server: `process.env.DATABASE_URL`
- Client: `process.env.NEXT_PUBLIC_API_URL`

## Deployment

The app can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Docker**
- **Any Node.js hosting**

For Vercel with monorepo:

```json
// vercel.json
{
  "buildCommand": "cd ../.. && pnpm turbo build --filter=web",
  "outputDirectory": ".next"
}
```
