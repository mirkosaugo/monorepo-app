---
sidebar_position: 1
---

# Installation

This guide walks you through setting up the Monorepo app from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **pnpm** 9.0 or higher

### Installing pnpm

If you don't have pnpm installed:

```bash
# Using npm
npm install -g pnpm

# Or using Homebrew (macOS)
brew install pnpm

# Or using Corepack (Node.js 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

## Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd turborepo-shadcn
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for:

- Root workspace
- `apps/web` (Next.js)
- `apps/storybook` (Storybook)
- `apps/docs` (Docusaurus)
- `packages/ui` (Component library)

### 3. Start Development

```bash
# Start all apps
pnpm dev

# Or start specific apps
pnpm dev:web        # Only Next.js (port 3000)
pnpm dev:storybook  # Only Storybook (port 6006)
pnpm dev:docs       # Only Docusaurus (port 3002)
```

### 4. Build for Production

```bash
pnpm build
```

This builds all apps in the correct dependency order.

## Verifying Installation

After running `pnpm dev`, verify each app is running:

1. **Next.js Todo App**: Open [http://localhost:3000](http://localhost:3000)

   - You should see a Todo app with add/remove functionality

2. **Storybook**: Open [http://localhost:6006](http://localhost:6006)

   - You should see the component library documentation

3. **Docusaurus**: Open [http://localhost:3002](http://localhost:3002)
   - You should see this documentation site

## Troubleshooting

### Port Already in Use

If a port is already in use, you can modify the port in the respective `package.json`:

```json
// apps/web/package.json
"scripts": {
  "dev": "next dev --port 3001"  // Change port
}
```

### pnpm Not Found

If you get "command not found: pnpm", ensure pnpm is in your PATH:

```bash
# Add to your shell profile (.bashrc, .zshrc, etc.)
export PATH="$HOME/.local/share/pnpm:$PATH"
```

### Cache Issues

If you encounter strange build issues, clear the Turborepo cache:

```bash
# Clear turbo cache
pnpm turbo clean

# Or manually delete
rm -rf .turbo
rm -rf node_modules/.cache
```

## Next Steps

Now that you have the monorepo running:

- [Explore the project structure](/getting-started/project-structure)
- [Learn the available commands](/getting-started/commands)
- [Start using components](/components/overview)
