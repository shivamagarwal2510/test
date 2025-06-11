import React, { useState, useEffect } from 'react';
    import { nanoid } from 'nanoid';
    import { Todo } from './types';
    import TodoForm from './components/TodoForm';
    import TodoList from './components/TodoList';

    function App() {
      const [todos, setTodos] = useState<Todo[]>(() => {
        // Load todos from local storage on initial render
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
      });

      // Save todos to local storage whenever the todos state changes
      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

      const addTodo = (text: string) => {
        const newTodo: Todo = {
          id: nanoid(),
          text,
          completed: false,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      };

      const toggleTodoComplete = (id: string) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      };

      const deleteTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      };

      const clearCompletedTodos = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
      };

      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
              My Todo List
            </h1>
            <TodoForm onAddTodo={addTodo} />
            <TodoList
              todos={todos}
              onToggleComplete={toggleTodoComplete}
              onDelete={deleteTodo}
            />
            {todos.some(todo => todo.completed) && (
              <button
                onClick={clearCompletedTodos}
                className="mt-6 w-full p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Clear Completed
              </button>
            )}
          </div>
        </div>
      );
    }

    export default App;
