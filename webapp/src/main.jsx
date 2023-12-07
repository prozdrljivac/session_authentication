// Add app routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Add login page
// Add home page
// Add interceptor
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <h1>Hello World</h1> },
  { path: "/login", element: <h1>Login Page</h1> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
