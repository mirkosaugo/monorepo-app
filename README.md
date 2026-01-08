# Turborepo + shadcn/ui Monorepo

A modern monorepo setup with Turborepo, Next.js, Storybook, Docusaurus, and a UI library based on shadcn/ui.

## Structure

```
monorepo-app/
├── apps/
│   ├── web/                    # Next.js 14 App (Todo App demo)
│   ├── storybook/              # Storybook 8 for component documentation
│   └── docs/                   # Docusaurus 3 documentation site
├── packages/
│   └── ui/                     # Component library @monorepo-app/ui
├── turbo.json                  # Turborepo configuration
├── pnpm-workspace.yaml         # pnpm workspace config
└── package.json                # Root scripts and dependencies
```

## Commands

```bash
# Install dependencies
pnpm install

# Start everything in parallel (Next.js + Storybook + Docusaurus)
pnpm dev

# Start only Next.js (port 3000)
pnpm dev:web

# Start only Storybook (port 6006)
pnpm dev:storybook

# Start only Docusaurus (port 3002)
pnpm dev:docs

# Production build
pnpm build
```

## Documentation

Full documentation is available in the Docusaurus app. Run `pnpm dev:docs` and open [http://localhost:3002](http://localhost:3002).

The documentation includes:

- Getting Started guides
- Component API references
- How to add new components, apps, and packages
- How Turborepo works
- Development workflow best practices
- How to rename the package namespace

## Packages

### `@monorepo-app/ui` - Component Library

Available shadcn/ui components:

| Component  | Import                                                     | Description                                                                  |
| ---------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `Button`   | `import { Button } from "@monorepo-app/ui"`                | Button with variants (default, destructive, outline, secondary, ghost, link) |
| `Input`    | `import { Input } from "@monorepo-app/ui"`                 | Input field with shadcn styles                                               |
| `Card`     | `import { Card, CardHeader, ... } from "@monorepo-app/ui"` | Card container with header, content, footer                                  |
| `Checkbox` | `import { Checkbox } from "@monorepo-app/ui"`              | Checkbox with onCheckedChange callback                                       |

**Usage in an app:**

```tsx
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@monorepo-app/ui";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Type something..." />
        <Button variant="outline">Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Adding New shadcn/ui Components

Use the shadcn CLI to add new components:

```bash
# Navigate to the UI package
cd packages/ui

# Add a component (e.g., badge)
npx shadcn@latest add badge

# Add multiple components at once
npx shadcn@latest add dialog alert-dialog dropdown-menu
```

After adding, export the component in `packages/ui/src/index.ts`:

```tsx
export { Badge, badgeVariants } from "./components/ui/badge";
```

Then use it in your app:

```tsx
import { Badge } from "@monorepo-app/ui";

<Badge variant="secondary">New</Badge>;
```

For detailed instructions, see the [Adding Components](http://localhost:3002/components/adding-components) guide in the documentation.

## Adding a New App

1. **Create the folder** in `apps/`:

   ```bash
   mkdir -p apps/admin
   ```

2. **Create `package.json`**:

   ```json
   {
     "name": "admin",
     "version": "0.0.1",
     "private": true,
     "scripts": {
       "dev": "next dev --port 3001",
       "build": "next build",
       "start": "next start"
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
       "autoprefixer": "^10.4.0",
       "postcss": "^8.4.0",
       "tailwindcss": "^3.4.0",
       "typescript": "^5.3.0"
     }
   }
   ```

3. **Configure Tailwind** by copying from `apps/web/`:

   - `tailwind.config.ts`
   - `postcss.config.js`
   - `tsconfig.json`
   - `next.config.js`

4. **Create the app structure**:

   ```
   apps/admin/
   ├── app/
   │   ├── layout.tsx
   │   ├── page.tsx
   │   └── globals.css
   └── ...config files
   ```

5. **Install and run**:
   ```bash
   pnpm install
   pnpm dev --filter=admin
   ```

For a complete step-by-step guide including Docusaurus setup example, see the [Adding Apps](http://localhost:3002/apps/adding-apps) documentation.

## Adding a New Package

1. **Create the folder** in `packages/`:

   ```bash
   mkdir -p packages/utils/src
   ```

2. **Create `package.json`**:

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
       "build": "tsc"
     },
     "devDependencies": {
       "typescript": "^5.3.0"
     }
   }
   ```

3. **Use in other apps/packages**:
   ```json
   {
     "dependencies": {
       "@monorepo-app/utils": "workspace:*"
     }
   }
   ```

## Renaming the Package Namespace

To change `@monorepo-app` to your own namespace (e.g., `@your-company`):

```bash
# Find all files with the namespace
grep -r "@monorepo-app" --include="*.json" --include="*.ts" --include="*.tsx" -l

# Replace using sed (macOS)
find . -name "*.json" -o -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/@monorepo-app/@your-company/g'
```

Then reinstall dependencies:

```bash
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

See the [Renaming Namespace](http://localhost:3002/guides/renaming-namespace) guide for detailed instructions.

## How the Ecosystem Works

### Turborepo

- **Parallel pipelines**: `turbo.json` defines tasks (build, dev, lint) that run in parallel
- **Caching**: Builds are cached to speed up subsequent runs
- **Dependencies**: `dependsOn: ["^build"]` ensures packages are built before apps

### pnpm Workspaces

- **Workspace protocol**: `workspace:*` links local packages without publishing
- **Hoisting**: Common dependencies are shared at the root

### Development Flow

```
1. Modify a component in packages/ui
2. Turborepo detects the change
3. Apps (web, storybook, docs) automatically reload
4. Real-time hot reload
```

## Claude Code Integration

This monorepo includes custom [Claude Code](https://claude.ai/code) commands that automate common development tasks.

### Quick Start

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Start Claude Code in the project
cd monorepo-app
claude
```

### Available Commands

| Command                     | Description                                           |
| --------------------------- | ----------------------------------------------------- |
| `/install-component <name>` | Install shadcn component + create story + create docs |
| `/list-components`          | Show all components and their status                  |
| `/add-story <name>`         | Create Storybook story for existing component         |
| `/add-docs <name>`          | Create Docusaurus docs for existing component         |

### Example: Adding a Component

```bash
# In Claude Code
> /install-component badge

# This automatically:
# 1. Runs: npx shadcn@latest add badge
# 2. Exports from packages/ui/src/index.ts
# 3. Creates apps/storybook/stories/Badge.stories.tsx
# 4. Creates apps/docs/docs/components/badge.md
# 5. Runs: pnpm build
```

See the [Claude Code Integration](http://localhost:3002/guides/claude-code-integration) guide for full documentation.

## Tech Stack

- **[Turborepo](https://turbo.build/)** - Monorepo build system
- **[pnpm](https://pnpm.io/)** - Fast package manager with workspaces
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[Storybook 8](https://storybook.js.org/)** - Component documentation
- **[Docusaurus 3](https://docusaurus.io/)** - Project documentation
- **[shadcn/ui](https://ui.shadcn.com/)** - Accessible UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Claude Code](https://claude.ai/code)** - AI-powered development automation
