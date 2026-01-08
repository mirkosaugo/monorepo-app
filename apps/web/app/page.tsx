"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Checkbox,
} from "@monorepo-app/ui";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn Turborepo", completed: false },
    { id: 2, text: "Build UI library with shadcn", completed: true },
    { id: 3, text: "Create Todo App", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Todo App</CardTitle>
            <CardDescription>
              Built with Turborepo, Next.js and shadcn/ui components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo}>Add</Button>
            </div>

            {/* Todo List */}
            <div className="space-y-2">
              {todos.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No todos yet. Add one above!
                </p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    <span
                      className={`flex-1 ${
                        todo.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            {todos.length > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
                <span>{todos.filter((t) => !t.completed).length} remaining</span>
                <span>{todos.filter((t) => t.completed).length} completed</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
