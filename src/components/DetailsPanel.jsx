import React from "react";
import useTodo from "./useTodo";

export default function DetailsPanel() {
  const { state } = useTodo();
  const completedCount = state.todos.filter((t) => t.completed).length;
  const totalCount = state.todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className="w-full md:w-80 p-4 hover:scale-105 duration-300 ">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Task Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Progress</h3>
            <div className="mt-2">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 rounded-full h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Statistics</h3>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-600">
                Active tasks: {state.todos.filter((t) => !t.completed).length}
              </p>
              <p className="text-sm text-gray-600">
                Completed tasks: {completedCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
