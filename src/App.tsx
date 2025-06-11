import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Todo } from './types';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300 p-4 sm:p-8 flex justify-center items-start">
      <div className="max-w-xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 sm:p-8 mt-10 relative">
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Todo List
        </h1>

        <div className="mb-6">
          <TodoForm onAddTodo={addTodo} />
        </div>

        <TodoList todos={todos} onToggleComplete={toggleComplete} onDelete={deleteTodo} />

        {todos.length > 0 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                         dark:bg-red-600 dark:hover:bg-red-700 transition-colors duration-200 text-sm"
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
