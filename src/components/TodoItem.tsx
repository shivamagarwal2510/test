import React from 'react';
import { Todo } from '../types';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
      className="flex items-center justify-between p-4 my-2 rounded-lg shadow-md bg-white
                 dark:bg-gray-800 transition-colors duration-200"
    >
      <div className="flex items-center flex-grow">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="mr-3 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-200"
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed ? <CheckCircle size={24} fill="currentColor" /> : <Circle size={24} />}
        </button>
        <span
          className={`flex-grow text-lg break-words ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'} transition-colors duration-200`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-3 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
        aria-label="Delete todo"
      >
        <X size={24} />
      </button>
    </motion.li>
  );
};

export default TodoItem;
