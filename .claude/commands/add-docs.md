---
description: Create Docusaurus documentation for an existing component
allowed-tools: Read, Write, Glob, Grep
---

# Create Documentation for: $ARGUMENTS

Create Docusaurus documentation for the component "$ARGUMENTS" that already exists in the UI package.

## Steps

1. **Read the component source**:
   - Find and read the component at `packages/ui/src/components/ui/$ARGUMENTS.tsx`
   - Identify all props, variants, types, and usage patterns

2. **Check existing documentation**:
   - Look for existing docs at `apps/docs/docs/components/`
   - Determine the next available sidebar_position
   - If docs exist, ask user if they want to overwrite

3. **Create the documentation file**:
   - Create `apps/docs/docs/components/{kebab-case-name}.md`

## Documentation Template

```markdown
---
sidebar_position: {next_position}
---

# ComponentName

{Brief description of what the component does and common use cases}

## Import

\`\`\`tsx
import { ComponentName } from "@monorepo-app/ui";
\`\`\`

## Basic Usage

\`\`\`tsx
<ComponentName>Content</ComponentName>
\`\`\`

## Variants

{Document each variant with description and code example}

### VariantName

Description of this variant and when to use it.

\`\`\`tsx
<ComponentName variant="variantName">Example</ComponentName>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Content to display |
| variant | "default" \| "secondary" | "default" | Visual style variant |
| ... | ... | ... | ... |

## Examples

### Real-World Example Title

\`\`\`tsx
import { ComponentName } from "@monorepo-app/ui";

export default function Example() {
  return (
    <ComponentName>
      Real world usage example
    </ComponentName>
  );
}
\`\`\`

## Customization

\`\`\`tsx
// Example of custom styling
<ComponentName className="custom-class">
  Customized
</ComponentName>
\`\`\`

## Accessibility

- Keyboard navigation support
- Screen reader compatibility
- ARIA attributes used
- Focus management

## Source Code

Located at: \`packages/ui/src/components/ui/{component-name}.tsx\`
```

## Requirements

- Document ALL props from the component
- Include real-world usage examples
- Explain when to use each variant
- Add accessibility information
- Use `@monorepo-app/ui` for imports
- Follow existing documentation patterns
