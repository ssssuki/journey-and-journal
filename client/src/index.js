import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import CreatePost from "./components/CreatePost";
import reportWebVitals from "./reportWebVitals";
import Application from "./components/Application";
import Posts from "./components/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
  },
  {
    path: "/create",
    element: <CreatePost />,
  },
  {
    path: "/posts",
    element: <Posts />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
