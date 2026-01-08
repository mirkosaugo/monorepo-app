import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@monorepo-app/ui";
import { useState } from "react";

/**
 * A checkbox component with support for controlled and uncontrolled states.
 *
 * Built on top of shadcn/ui Checkbox component using Radix UI primitives.
 *
 * @see https://ui.shadcn.com/docs/components/checkbox
 */
const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A control that allows the user to toggle between checked and not checked. Supports disabled state and works with labels. [View shadcn/ui docs](https://ui.shadcn.com/docs/components/checkbox)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
};

export const TodoList: Story = {
  render: function TodoListExample() {
    const [todos, setTodos] = useState([
      { id: 1, text: "Learn React", completed: true },
      { id: 2, text: "Build a todo app", completed: false },
      { id: 3, text: "Deploy to production", completed: false },
    ]);

    const toggleTodo = (id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

    return (
      <div className="space-y-3 w-64">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center space-x-2">
            <Checkbox
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-sm ${
                todo.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {todo.text}
            </label>
          </div>
        ))}
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <label htmlFor="unchecked" className="text-sm">
          Unchecked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" defaultChecked />
        <label htmlFor="checked" className="text-sm">
          Checked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm text-muted-foreground">
          Disabled
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <label
          htmlFor="disabled-checked"
          className="text-sm text-muted-foreground"
        >
          Disabled Checked
        </label>
      </div>
    </div>
  ),
};
