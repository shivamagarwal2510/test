import React from 'react';
import { Todo } from '../types';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <ul className="w-full">
      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 text-lg mt-4 dark:text-gray-400 transition-colors duration-200"
          >
            No todos yet! Add some above.
          </motion.p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))
        )}
      </AnimatePresence>
    </ul>
  );
};

export default TodoList;
