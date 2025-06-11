import React from 'react';
    import { Todo } from '../types';
    import { Check, X } from 'lucide-react';
    import { motion } from 'framer-motion';

    interface TodoItemProps {
      todo: Todo;
      onToggleComplete: (id: string) => void;
      onDelete: (id: string) => void;
    }

    const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
      return (
        <motion.li
          layout
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -50, filter: 'blur(5px)' }}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-2 transition-all duration-300 ease-in-out
            ${todo.completed ? 'opacity-70 line-through text-gray-500' : 'text-gray-900'}`}
        >
          <span className="flex-grow text-lg break-words pr-4">
            {todo.text}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleComplete(todo.id)}
              className={`p-2 rounded-full transition-colors duration-200
                ${todo.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              <Check className={`w-5 h-5 ${todo.completed ? 'text-white' : 'text-gray-600'}`} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 bg-red-500 text-white rounded-full shadow-sm hover:bg-red-600 transition-colors duration-200"
              aria-label="Delete todo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.li>
      );
    };

    export default TodoItem;
