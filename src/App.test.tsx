import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Todo App", () => {
  test("should add a new todo", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Начните вводить...");
    const addButton = screen.getByText("Добавить");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("should mark todo as completed", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Начните вводить...");
    const addButton = screen.getByText("Добавить");

    fireEvent.change(input, { target: { value: "Task to Complete" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText("Task to Complete")).toHaveClass("todo-completed");
  });

  test("should delete a todo", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Начните вводить...");
    const addButton = screen.getByText("Добавить");

    fireEvent.change(input, { target: { value: "Task to Delete" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText("Удалить");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
  });

  test("should filter completed todos and hide incomplete todos", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Начните вводить...");
    const addButton = screen.getByText("Добавить");

    // Add completed task
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);
    const completedCheckbox = screen.getByRole("checkbox");
    fireEvent.click(completedCheckbox);

    // Add incomplete task
    fireEvent.change(input, { target: { value: "Incomplete Task" } });
    fireEvent.click(addButton);

    const completedFilter = screen.getByText("Готовые");
    fireEvent.click(completedFilter);

    expect(screen.getByText("Completed Task")).toBeInTheDocument();
    expect(screen.queryByText("Incomplete Task")).not.toBeInTheDocument();
  });

  test("should filter incomplete todos and hide completed todos", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Начните вводить...");
    const addButton = screen.getByText("Добавить");

    // Add completed task
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);
    const completedCheckbox = screen.getByRole("checkbox");
    fireEvent.click(completedCheckbox);

    // Add incomplete task
    fireEvent.change(input, { target: { value: "Incomplete Task" } });
    fireEvent.click(addButton);

    const incompleteFilter = screen.getByText("Неготовые");
    fireEvent.click(incompleteFilter);

    expect(screen.getByText("Incomplete Task")).toBeInTheDocument();
    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
  });
});
