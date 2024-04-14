import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, LoginPage } from "./pages";
// Add home page
// Add interceptor
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
