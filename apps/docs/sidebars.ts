import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/installation", "getting-started/project-structure", "getting-started/commands"],
    },
    {
      type: "category",
      label: "Components",
      items: [
        "components/overview",
        "components/button",
        "components/input",
        "components/card",
        "components/checkbox",
        "components/adding-components",
      ],
    },
    {
      type: "category",
      label: "Apps",
      items: [
        "apps/overview",
        "apps/nextjs-web",
        "apps/storybook",
        "apps/docusaurus",
        "apps/adding-apps",
      ],
    },
    {
      type: "category",
      label: "Packages",
      items: ["packages/overview", "packages/ui-library", "packages/adding-packages"],
    },
    {
      type: "category",
      label: "Guides",
      items: [
        "guides/how-turborepo-works",
        "guides/development-workflow",
        "guides/renaming-namespace",
        "guides/claude-code-integration",
      ],
    },
  ],
};

export default sidebars;
