import React from "react";
import useTodo from "./useTodo";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";
import Overlay from "./Overlay";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import DetailsPanel from "./DetailsPanel";

export default function TodoApp() {
  const { state, screenSize } = useTodo();
  const isDesktop = screenSize.width >= 1024;

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-200 to-white  overflow-x-hidden">
      <MobileHeader />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <Overlay />

        <div className="md:flex-1 flex flex-col justify-around  md:flex-row ">
          <div className="flex-1 p-4 md:p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
              <div className="px-6 py-4 bg-purple-600">
                <h2 className="text-xl font-bold text-white">Tasks</h2>
              </div>
              <TodoForm />
              <TodoList />
              {state.todos.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No todos yet. Add one above!
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <DetailsPanel />
          </div>

          {isDesktop && (
            <div className="hidden md:block">
              <DetailsPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
