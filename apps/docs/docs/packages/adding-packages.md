---
sidebar_position: 3
---

# Adding New Packages

This guide walks you through adding a new shared package to the monorepo, using a utilities package as an example.

## Overview

Adding a new package involves:

1. Creating the package directory
2. Configuring package.json
3. Creating the source files
4. Exporting from index.ts
5. Using in apps

## Example: Creating a Utils Package

### Step 1: Create Directory Structure

```bash
mkdir -p packages/utils/src
```

### Step 2: Create package.json

Create `packages/utils/package.json`:

```json
{
  "name": "@monorepo-app/utils",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "build": "tsc",
    "lint": "eslint src/"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

### Step 3: Create tsconfig.json

Create `packages/utils/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 4: Create Utility Functions

Create `packages/utils/src/format.ts`:

```ts
/**
 * Formats a number as currency
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Formats a date in a human-readable format
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(d);
}

/**
 * Formats a number with thousands separators
 */
export function formatNumber(
  num: number,
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale).format(num);
}
```

Create `packages/utils/src/validation.ts`:

```ts
/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a string is empty or only whitespace
 */
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}
```

Create `packages/utils/src/array.ts`:

```ts
/**
 * Groups an array by a key
 */
export function groupBy<T>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Removes duplicates from an array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Chunks an array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

### Step 5: Create Index File

Create `packages/utils/src/index.ts`:

```ts
// Format utilities
export {
  formatCurrency,
  formatDate,
  formatNumber,
} from "./format";

// Validation utilities
export {
  isValidEmail,
  isValidUrl,
  isEmpty,
} from "./validation";

// Array utilities
export {
  groupBy,
  unique,
  chunk,
} from "./array";
```

### Step 6: Install Dependencies

```bash
pnpm install
```

### Step 7: Use in an App

Add to your app's `package.json`:

```json
{
  "dependencies": {
    "@monorepo-app/utils": "workspace:*"
  }
}
```

Then use in your code:

```tsx
// apps/web/app/page.tsx
import { formatCurrency, formatDate, isValidEmail } from "@monorepo-app/utils";

export default function Home() {
  return (
    <div>
      <p>Price: {formatCurrency(29.99)}</p>
      <p>Date: {formatDate(new Date())}</p>
      <p>Valid email: {isValidEmail("test@example.com") ? "Yes" : "No"}</p>
    </div>
  );
}
```

### Step 8: Configure App's tsconfig.json

Add path alias for better imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@monorepo-app/utils": ["../../packages/utils/src"],
      "@monorepo-app/utils/*": ["../../packages/utils/src/*"]
    }
  }
}
```

## Other Package Examples

### Config Package

Shared configuration files:

```
packages/config/
├── eslint/
│   └── index.js
├── tailwind/
│   └── index.ts
├── tsconfig/
│   ├── base.json
│   ├── nextjs.json
│   └── react.json
└── package.json
```

```json
{
  "name": "@monorepo-app/config",
  "exports": {
    "./eslint": "./eslint/index.js",
    "./tailwind": "./tailwind/index.ts",
    "./tsconfig/base": "./tsconfig/base.json",
    "./tsconfig/nextjs": "./tsconfig/nextjs.json"
  }
}
```

Usage:

```json
// apps/web/tsconfig.json
{
  "extends": "@monorepo-app/config/tsconfig/nextjs"
}
```

### Types Package

Shared TypeScript types:

```
packages/types/
├── src/
│   ├── user.ts
│   ├── api.ts
│   └── index.ts
└── package.json
```

```ts
// packages/types/src/user.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface UserProfile extends User {
  avatar?: string;
  bio?: string;
}
```

### API Client Package

Shared API client:

```
packages/api/
├── src/
│   ├── client.ts
│   ├── endpoints/
│   │   ├── users.ts
│   │   └── products.ts
│   └── index.ts
└── package.json
```

```ts
// packages/api/src/client.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
```

## Package Dependencies

Packages can depend on other packages:

```json
// packages/api/package.json
{
  "dependencies": {
    "@monorepo-app/types": "workspace:*"
  }
}
```

## Build Order

Turborepo handles build order automatically. If `@monorepo-app/api` depends on `@monorepo-app/types`, Turborepo will build `@monorepo-app/types` first.

## Checklist

When adding a new package:

- [ ] Create directory in `packages/`
- [ ] Create `package.json` with unique `@monorepo-app/` name
- [ ] Create `tsconfig.json` extending root
- [ ] Create source files in `src/`
- [ ] Create `src/index.ts` with exports
- [ ] Run `pnpm install` from root
- [ ] Add to consuming apps' `package.json`
- [ ] Configure path aliases in consuming apps
- [ ] Test imports work correctly
- [ ] Run `pnpm build` to verify no errors
