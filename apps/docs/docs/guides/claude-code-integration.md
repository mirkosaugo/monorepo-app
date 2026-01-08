---
sidebar_position: 4
---

# Claude Code Integration

This monorepo includes custom Claude Code instructions and commands that automate common development tasks, particularly around component management.

## Overview

[Claude Code](https://claude.ai/code) is an AI-powered CLI tool that can understand your codebase and help with development tasks. This project includes:

- **CLAUDE.md** - Project-specific instructions that Claude Code reads automatically
- **Custom Commands** - Slash commands for common workflows
- **.claude/commands/** - Directory containing command definitions

## Available Commands

### `/install-component <name>`

The main command for adding new shadcn/ui components. This command automates the entire workflow:

1. Installs the component using the shadcn CLI
2. Exports it from the UI package
3. Creates a comprehensive Storybook story
4. Creates Docusaurus documentation
5. Verifies the build

**Usage:**

```bash
# In Claude Code terminal
> /install-component badge

# Or with multiple words
> /install-component alert-dialog
```

**What it does:**

```
packages/ui/
├── src/
│   ├── components/ui/
│   │   └── badge.tsx          # ← Component installed here
│   └── index.ts               # ← Export added here

apps/storybook/
└── stories/
    └── Badge.stories.tsx      # ← Story created here

apps/docs/
└── docs/components/
    └── badge.md               # ← Documentation created here
```

### `/list-components`

Lists all components in the UI package and their status.

**Usage:**

```bash
> /list-components
```

**Output:**

```
| Component | Exported | Story | Docs |
|-----------|----------|-------|------|
| Button    | Yes      | Yes   | Yes  |
| Input     | Yes      | Yes   | Yes  |
| Card      | Yes      | Yes   | Yes  |
| Badge     | Yes      | No    | No   |  ← Missing story and docs
```

### `/add-story <name>`

Creates a Storybook story for an existing component that doesn't have one.

**Usage:**

```bash
> /add-story badge
```

### `/add-docs <name>`

Creates Docusaurus documentation for an existing component.

**Usage:**

```bash
> /add-docs badge
```

## Setup

### Prerequisites

1. Install Claude Code CLI:
   ```bash
   npm install -g @anthropic-ai/claude-code
   # or
   brew install claude-code
   ```

2. Authenticate with Claude:
   ```bash
   claude login
   ```

### Project Configuration

This project is already configured with Claude Code. The configuration files are:

```
turborepo-shadcn/
├── CLAUDE.md                    # Project instructions
└── .claude/
    └── commands/
        ├── install-component.md # Main installation command
        ├── list-components.md   # List components command
        ├── add-story.md         # Add story command
        └── add-docs.md          # Add docs command
```

## How It Works

### CLAUDE.md

The `CLAUDE.md` file at the project root contains:

- Project structure overview
- Package namespace (`@monorepo-app/ui`)
- Common commands
- Coding guidelines
- Component installation workflow

Claude Code automatically reads this file when you start a session in the project directory.

### Custom Commands

Commands are defined as Markdown files in `.claude/commands/`. Each file contains:

1. **Frontmatter** - Metadata like description and allowed tools
2. **Instructions** - Detailed steps for Claude to follow
3. **Templates** - Code templates to use

**Example command structure:**

```markdown
---
description: Install a shadcn/ui component
allowed-tools: Bash(cd:*), Bash(npx:*), Read, Write, Edit
---

# Install Component: $ARGUMENTS

Steps to follow...

## Step 1: Install the component

Run the shadcn CLI...

## Step 2: Export from UI package

Edit packages/ui/src/index.ts...
```

The `$ARGUMENTS` placeholder is replaced with whatever you type after the command.

## Usage Examples

### Adding a New Component

```bash
# Start Claude Code in the project directory
cd turborepo-shadcn
claude

# Run the install command
> /install-component accordion

# Claude will:
# 1. Run: cd packages/ui && npx shadcn@latest add accordion
# 2. Add export to packages/ui/src/index.ts
# 3. Create apps/storybook/stories/Accordion.stories.tsx
# 4. Create apps/docs/docs/components/accordion.md
# 5. Run: pnpm build
```

### Checking Component Status

```bash
> /list-components

# Output shows which components need stories or docs
```

### Adding Missing Documentation

```bash
# If a component exists but has no docs
> /add-docs tooltip

# If a component exists but has no story
> /add-story tooltip
```

## Customizing Commands

### Creating Your Own Commands

1. Create a new `.md` file in `.claude/commands/`:

```bash
touch .claude/commands/my-command.md
```

2. Add frontmatter and instructions:

```markdown
---
description: Description shown in /help
allowed-tools: Bash(*), Read, Write
---

# My Custom Command

Instructions for Claude...
```

3. Use it:

```bash
> /my-command
```

### Command Arguments

- `$ARGUMENTS` - All arguments as a single string
- `$1`, `$2`, etc. - Individual positional arguments

**Example:**

```markdown
---
description: Create component with variant
---

# Create $1 with variant $2

Create component named $1 using variant $2...
```

Usage: `/my-command Button primary`

### Allowed Tools

Control what tools the command can use:

```markdown
---
allowed-tools: Bash(npm:*), Read, Write, Edit
---
```

Common tools:
- `Bash(pattern:*)` - Run bash commands matching pattern
- `Read` - Read files
- `Write` - Create new files
- `Edit` - Modify existing files
- `Glob` - Search for files
- `Grep` - Search file contents

## Best Practices

### 1. Use Commands for Repetitive Tasks

If you find yourself doing the same steps repeatedly, create a command:

- Adding test files
- Creating new pages
- Setting up API routes
- Generating types

### 2. Keep CLAUDE.md Updated

Update `CLAUDE.md` when you:

- Add new packages or apps
- Change the project structure
- Update coding conventions
- Add new workflows

### 3. Share Commands with Your Team

Commands in `.claude/commands/` are tracked in git and shared with the team. Personal commands can go in `~/.claude/commands/`.

### 4. Test Commands

After creating a command, test it:

```bash
> /your-command test-argument
```

Check that all steps complete successfully.

## Troubleshooting

### Command Not Found

Make sure:
1. The file is in `.claude/commands/`
2. The file has a `.md` extension
3. You're in the project directory

### Command Fails

Check:
1. The `allowed-tools` frontmatter includes necessary tools
2. File paths in the command are correct
3. The component/file exists

### CLAUDE.md Not Loading

Ensure:
1. The file is named exactly `CLAUDE.md` (case-sensitive)
2. It's in the project root
3. Claude Code was started from the project directory

## Related Resources

- [Claude Code Documentation](https://claude.ai/code/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Adding Components Guide](/components/adding-components)
- [Development Workflow](/guides/development-workflow)
