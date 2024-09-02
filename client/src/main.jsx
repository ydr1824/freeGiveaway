import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import ItemDetails from "./item-details.jsx";
import AddItem from "./add-item.jsx";
import Login from "./log-in.jsx";
import SignUp from "./sign-up.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/details",
    element: <ItemDetails />,
  },

  {
    path: "/add-item",
    element: <AddItem />,
  },

  { path: "/login", element: <Login /> },

  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
