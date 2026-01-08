---
description: List all available shadcn/ui components in the UI package
allowed-tools: Bash(ls:*), Read, Glob
---

# List Available Components

List all components currently available in the `@monorepo-app/ui` package.

## Tasks

1. **Read the exports file** to see what's exported:
   - Read `packages/ui/src/index.ts`

2. **List component files** in the components directory:
   - List all `.tsx` files in `packages/ui/src/components/ui/`

3. **Check Storybook stories**:
   - List all story files in `apps/storybook/stories/`

4. **Check documentation**:
   - List all component docs in `apps/docs/docs/components/`

## Output Format

Present the results in a table format:

| Component | Exported | Story | Docs |
|-----------|----------|-------|------|
| Button    | Yes      | Yes   | Yes  |
| Input     | Yes      | Yes   | Yes  |
| ...       | ...      | ...   | ...  |

Also list any components that are:
- Installed but not exported
- Exported but missing stories
- Exported but missing documentation

## Suggestions

If there are missing stories or documentation, suggest running:
```
/install-component <component-name>
```
to complete the setup.
