import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.scss";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import UserPage from "./pages/UserPage";
import MyProfilePage from "./pages/MyProfilePage";
import reportWebVitals from "./reportWebVitals";
// import Application from "./components/Application";
import Posts from "./components/Posts";
import IndividualPostPage from "./pages/IndividualPostPage";
import SearchPage from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/posts/:id",
    element: <IndividualPostPage />,
  },
  {
    path: "/user/:id",
    element: <UserPage />,
  },
  {
    path: "/myprofile",
    element: <MyProfilePage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/search/:coords",
    element: <SearchPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more:https://bit.ly/CRA-vitals
reportWebVitals();
