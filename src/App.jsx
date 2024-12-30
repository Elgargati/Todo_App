import React, { useState, useEffect, useReducer, createContext } from "react";
import { ToastContainer } from "react-toastify";
import TodoApp from "./components/TodoApp";

export const TodoContext = createContext(null);

export const TODO_ACTIONS = {
  ADD_TODO: "ADD_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  DELETE_TODO: "DELETE_TODO",
  SET_VIEW: "SET_VIEW",
};

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  view: "all",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            priority: "medium",
            dueDate: null,
          },
        ],
      };

    case TODO_ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case TODO_ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TODO_ACTIONS.SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };

    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const value = {
    state,
    dispatch,
    screenSize,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

const App = () => {
  return (
    <TodoProvider>
      <TodoApp />
      <ToastContainer
        theme="light"
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        limit={2}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </TodoProvider>
  );
};

export default App;
