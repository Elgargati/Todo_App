import React from "react";

import useTodo from "./useTodo";
import { Menu, X } from "lucide-react";

export default function MobileHeader() {
  const { isSidebarOpen, setIsSidebarOpen } = useTodo();

  return (
    <div className="md:hidden flex items-center justify-between px-4 py-3 bg-purple-800 text-white">
      <h1 className="text-xl font-bold">Todo App</h1>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
