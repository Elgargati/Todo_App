import React, { useState } from "react";
import useTodo from "./useTodo";
import { Plus } from "lucide-react";
import { TODO_ACTIONS } from "../App";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function TodoForm() {
  const { dispatch } = useTodo();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: newTodo });
      notify("success", "Task successfully added!");
      setNewTodo("");
    } else {
      notify("error", "Task cannot be empty!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </div>
    </form>
  );
}
