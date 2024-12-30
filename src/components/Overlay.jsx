import React from "react";
import useTodo from "./useTodo";

export default function Overlay() {
  const { isSidebarOpen, setIsSidebarOpen } = useTodo();

  if (!isSidebarOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      onClick={() => setIsSidebarOpen(false)}
    />
  );
}
