import React, { useState } from 'react';

    interface TodoFormProps {
      onAddTodo: (text: string) => void;
    }

    const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
      const [inputText, setInputText] = useState('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
          onAddTodo(inputText);
          setInputText('');
        }
      };

      return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-800"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 whitespace-nowrap"
          >
            Add Todo
          </button>
        </form>
      );
    };

    export default TodoForm;
