---
sidebar_position: 5
---

# Adding New Apps

This guide walks you through adding a new application to the monorepo, using a Next.js admin dashboard as an example.

## Overview

Adding a new app involves:

1. Creating the app directory structure
2. Configuring package.json
3. Setting up TypeScript and Tailwind
4. Creating the initial pages
5. Installing dependencies

## Example: Adding an Admin Dashboard

### Step 1: Create Directory Structure

```bash
mkdir -p apps/admin/app
```

### Step 2: Create package.json

Create `apps/admin/package.json`:

```json
{
  "name": "admin",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@monorepo-app/ui": "workspace:*",
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
```

**Key points:**
- Use a unique port (`3001`) to avoid conflicts
- Include `@monorepo-app/ui` as a workspace dependency
- Match React versions across the monorepo

### Step 3: Create next.config.js

Create `apps/admin/next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@monorepo-app/ui"],
};

module.exports = nextConfig;
```

### Step 4: Create tsconfig.json

Create `apps/admin/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@monorepo-app/ui": ["../../packages/ui/src"],
      "@monorepo-app/ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 5: Create tailwind.config.ts

Create `apps/admin/tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
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
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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

### Step 6: Create postcss.config.js

Create `apps/admin/postcss.config.js`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Step 7: Create Global CSS

Create `apps/admin/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

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

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode variables */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Step 8: Create Layout

Create `apps/admin/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing the application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### Step 9: Create Home Page

Create `apps/admin/app/page.tsx`:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
} from "@monorepo-app/ui";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Active users this month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">1,234</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">$12,345</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Pending orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">56</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Button>View All Reports</Button>
        </div>
      </div>
    </main>
  );
}
```

### Step 10: Install Dependencies

From the root of the monorepo:

```bash
pnpm install
```

### Step 11: Add to Root Scripts (Optional)

Add a convenience script to root `package.json`:

```json
{
  "scripts": {
    "dev:admin": "turbo dev --filter=admin"
  }
}
```

### Step 12: Run the App

```bash
# Using the new script
pnpm dev:admin

# Or using turbo directly
pnpm turbo dev --filter=admin
```

Open [http://localhost:3001](http://localhost:3001).

## Adding Other App Types

### Remix App

```json
{
  "name": "remix-app",
  "scripts": {
    "dev": "remix dev --port 3003",
    "build": "remix build"
  },
  "dependencies": {
    "@monorepo-app/ui": "workspace:*",
    "@remix-run/node": "^2.0.0",
    "@remix-run/react": "^2.0.0",
    "@remix-run/serve": "^2.0.0"
  }
}
```

### Express API

```json
{
  "name": "api",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "tsx": "^4.0.0",
    "typescript": "^5.3.0"
  }
}
```

### Vite React App

```json
{
  "name": "vite-app",
  "scripts": {
    "dev": "vite --port 3004",
    "build": "vite build"
  },
  "dependencies": {
    "@monorepo-app/ui": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0"
  }
}
```

## Port Conventions

Keep ports organized to avoid conflicts:

| App | Port |
|-----|------|
| web | 3000 |
| admin | 3001 |
| docs | 3002 |
| api | 3003 |
| storybook | 6006 |

## Checklist

When adding a new app:

- [ ] Create directory in `apps/`
- [ ] Create `package.json` with unique name and port
- [ ] Add `@monorepo-app/ui` dependency if using components
- [ ] Configure TypeScript (extend root config)
- [ ] Configure Tailwind (include UI package paths)
- [ ] Create initial pages/routes
- [ ] Run `pnpm install` from root
- [ ] Add convenience script to root `package.json`
- [ ] Test with `pnpm turbo dev --filter=<app-name>`
- [ ] Run `pnpm build` to verify build works
