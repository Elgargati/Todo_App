import React from "react";
import useTodo from "./useTodo";

import { Check, Grid, List } from "lucide-react";
import { TODO_ACTIONS } from "../App";
export default function Sidebar() {
  const { state, dispatch, isSidebarOpen, setIsSidebarOpen } = useTodo();

  return (
    <div
      className={`
        fixed md:static
        inset-y-0 left-0
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        transition-transform duration-300 ease-in-out
        w-64 bg-gradient-to-r from-violet-500 to-purple-500
        z-30
        md:z-auto
        ${isSidebarOpen ? "block" : "hidden md:block"}
        
      
      `}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8 text-white hidden md:block">
          Todo App
        </h1>
        <nav className="space-y-2">
          {["all", "active", "completed"].map((viewType) => (
            <button
              key={viewType}
              onClick={() => {
                dispatch({ type: TODO_ACTIONS.SET_VIEW, payload: viewType });
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`flex items-center space-x-2 w-full p-2 rounded capitalize text-white
                  ${
                    state.view === viewType
                      ? "bg-purple-700"
                      : "hover:bg-purple-700"
                  }`}
            >
              {viewType === "all" && <List size={20} />}
              {viewType === "active" && <Grid size={20} />}
              {viewType === "completed" && <Check size={20} />}
              <span>{viewType}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
