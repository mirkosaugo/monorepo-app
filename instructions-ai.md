# AI Instructions - Session Prompts

This file contains all the prompts used in the Claude Code session to create this monorepo boilerplate. These can be used as reference for future projects or to recreate similar setups.

---

## 1. Initial Monorepo Creation

**Prompt:**

```
Create a boilerplate monorepo app with Turborepo containing:
- A Next.js React app
- A Storybook app
- A UI library/package with shadcn/ui components

In the Next.js app, create a basic Todo app that uses some components from the shadcn library. Also add some examples in the Storybook folder with button stories.
```

**Follow-up choices made:**

- Location: New folder at `~/web/monorepo-app/`
- Package manager: pnpm
- Components: Base set (Button, Input, Card, Checkbox)

---

## 2. Docusaurus Documentation App

**Prompt:**

```
Create another app in the ecosystem with Docusaurus, writing all the documentation of the ecosystem and everything also explained in the README (always in English).

In Docusaurus, also include as an example all the steps to install Docusaurus, so it can be used as a future guideline for installing other apps.

For each section, create the relevant example. Like for installing a button in the shadcn/ui part, for adding a component that will then be used in the app (e.g., Next.js).

Also add the command to launch Docusaurus in the README.
```

---

## 3. Fix Component Installation Documentation

**Prompt:**

```
The entire "adding component" section in both the docs and README seems wrong. I believe the correct approach is to write documentation for shadcn/ui to install a component by adding it via CLI console instead of writing all the component code manually.

Also, I would like to change the name from "@repo" to "@monorepo-app" and document how to manually change it in the future.
```

---

## 4. Claude Code Integration

**Prompt:**

```
Would it be possible within the monorepo-app to create an ecosystem connected to Claude Code? For example, an instruction that it takes every time, for instance when installing a new component.

So instead of going through the shadcn CLI, then manually creating the story and documentation on Docusaurus, from the monorepo-app folder you launch a command like "claude install-component {componentname}" and it has all the instructions to do this.

If yes, then also document this entire part on Docusaurus.
```

---

## 5. Generate Instructions File

**Prompt:**

```
To finish, generate an instructions-ai.md file in the root app with all the command prompts I launched in this session, but written in English.
```

---

## Summary of What Was Created

### Project Structure

```
monorepo-app/
├── apps/
│   ├── web/                    # Next.js 14 Todo App
│   ├── storybook/              # Storybook 8 component documentation
│   └── docs/                   # Docusaurus 3 project documentation
├── packages/
│   └── ui/                     # @monorepo-app/ui component library
├── .claude/
│   └── commands/               # Custom Claude Code commands
│       ├── install-component.md
│       ├── list-components.md
│       ├── add-story.md
│       └── add-docs.md
├── CLAUDE.md                   # Claude Code project instructions
├── README.md                   # Project documentation
└── instructions-ai.md          # This file
```

### Key Features Implemented

1. **Turborepo Monorepo** with parallel task execution and caching
2. **shadcn/ui Component Library** with Button, Input, Card, Checkbox
3. **Next.js Todo App** demonstrating component usage
4. **Storybook** with stories for all components
5. **Docusaurus Documentation** covering:

   - Getting started guides
   - Component API references
   - How to add components, apps, and packages
   - How Turborepo works
   - Development workflow
   - Namespace renaming guide
   - Claude Code integration guide

6. **Claude Code Integration** with custom commands:
   - `/install-component <name>` - Full component installation workflow
   - `/list-components` - List all components and their status
   - `/add-story <name>` - Create Storybook story
   - `/add-docs <name>` - Create Docusaurus documentation

### Package Namespace

The UI package uses the namespace `@monorepo-app/ui`. Documentation is provided on how to rename this to a custom namespace.

---

## Useful Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:web          # Start Next.js (port 3000)
pnpm dev:storybook    # Start Storybook (port 6006)
pnpm dev:docs         # Start Docusaurus (port 3002)

# Build
pnpm build            # Build all apps

# Add shadcn component
cd packages/ui
npx shadcn@latest add <component-name>

# Claude Code commands
/install-component <name>   # Install + export + story + docs
/list-components            # Show component status
/add-story <name>           # Create Storybook story only
/add-docs <name>            # Create Docusaurus docs only
```

---

## Notes

- All documentation is in English
- The project uses pnpm as the package manager
- TypeScript is used throughout
- Tailwind CSS for styling
- Components follow shadcn/ui patterns with CSS variables for theming
