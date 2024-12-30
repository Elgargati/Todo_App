import React from "react";
import useTodo from "./useTodo";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Assurez-vous que les styles Toastify sont inclus
import { Check, Trash2 } from "lucide-react";
import { TODO_ACTIONS } from "../App";

// Fonction notify globale
const notify = (type, message) => {
  toast[type](message, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    draggable: true,
    theme: "light",
  });
};

export default function TodoList() {
  const { state, dispatch } = useTodo();

  const filteredTodos = {
    all: state.todos,
    active: state.todos.filter((todo) => !todo.completed),
    completed: state.todos.filter((todo) => todo.completed),
  };

  const handleToggleTodo = (id, completed) => {
    dispatch({
      type: TODO_ACTIONS.TOGGLE_TODO,
      payload: id,
    });

    notify(
      "info",
      `Task marked as ${completed ? "not completed" : "completed"}!`
    );
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: TODO_ACTIONS.DELETE_TODO,
      payload: id,
    });

    notify("warning", "Task successfully deleted!");
  };

  return (
    <>
      <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
        {filteredTodos[state.view].map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 group"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggleTodo(todo.id, todo.completed)}
                className={`p-1 rounded-full ${
                  todo.completed
                    ? "bg-green-500 text-white"
                    : "border-2 border-gray-300 hover:border-purple-500"
                }`}
              >
                {todo.completed && <Check size={16} />}
              </button>
              <span
                className={`${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
