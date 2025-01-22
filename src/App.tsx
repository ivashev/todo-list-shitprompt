import React, { useState, useCallback, useMemo } from "react";
import { Input, Button, Checkbox, List, Radio } from "antd";
import "antd/dist/reset.css";

import "./App.css";

interface TodoItem {
    id: number;
    text: string;
    isCompleted: boolean;
}

type Filter = "all" | "completed" | "incomplete";

const FILTER_OPTIONS: { [key in Filter]: string } = {
    all: "Все",
    completed: "Готовые",
    incomplete: "Неготовые",
};

const App: React.FC = () => {
    const [ todos, setTodos ] = useState<TodoItem[]>( [] );
    const [ filter, setFilter ] = useState<Filter>( "all" );
    const [ inputValue, setInputValue ] = useState( "" );

    const addTodo = useCallback(() => {
        if (inputValue.trim()) {
            const newTodo: TodoItem = {
                id: Date.now(),
                text: inputValue.trim(),
                isCompleted: false,
            };
            setTodos((prevTodos) => [ ...prevTodos, newTodo ]);
            setInputValue( "" );
        }
    }, [ inputValue ]);

    const toggleTodo = useCallback((id: number) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                } else {
                    return todo;
                }
            })
        );
    }, []);

    const deleteTodo = useCallback((id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, []);

    const filteredTodos = useMemo(() => todos.filter((todo) => {
        if (filter === "completed") {
            return todo.isCompleted;
        } else if (filter === "incomplete") {
            return !todo.isCompleted;
        } else {
            return true;
        }
    }), [ todos ]);

    return (
        <div className="app-container">
            <h1>TODO</h1>
            <div className="input-container">
                <Input
                    placeholder="Начните вводить..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={addTodo}
                />
                <Button type="primary" onClick={addTodo}>
                    Добавить
                </Button>
            </div>
            <Radio.Group
                value={filter}
                onChange={(e) => setFilter(e.target.value as Filter)}
                className="filter-group"
            >
                {Object.entries(FILTER_OPTIONS).map(([ value, label ]) => (
                    <Radio.Button key={value} value={value}>
                        {label}
                    </Radio.Button>
                ))}
            </Radio.Group>
            <List
                bordered
                dataSource={filteredTodos}
                renderItem={(todo) => (
                    <List.Item
                        actions={[
                            <Button danger onClick={() => deleteTodo(todo.id)}>
                                Удалить
                            </Button>,
                        ]}
                        className="ant-list-item-custom"
                    >
                        <Checkbox
                            checked={todo.isCompleted}
                            onChange={() => toggleTodo(todo.id)}
                        >
                          <span className={todo.isCompleted ? "todo-completed" : "todo-text"}>
                            {todo.text}
                          </span>
                        </Checkbox>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default App;
