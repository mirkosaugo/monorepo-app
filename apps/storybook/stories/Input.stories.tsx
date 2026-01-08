import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@monorepo-app/ui";

/**
 * A styled text input field component.
 *
 * Built on top of shadcn/ui Input component.
 *
 * @see https://ui.shadcn.com/docs/components/input
 */
const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A text input field with consistent styling. Supports all standard HTML input types (text, email, password, number, etc.). [View shadcn/ui docs](https://ui.shadcn.com/docs/components/input)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Hello World",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Input placeholder="Default" />
      <Input placeholder="With value" defaultValue="Some text" />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
};
