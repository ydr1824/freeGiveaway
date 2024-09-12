import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import ItemDetails from "./item-details.jsx";
import AddItem from "./add-item.jsx";
import { Login } from "./login.jsx";
import { SignUp } from "./sign-up.jsx";
import "./index.css";
import MyCart from "./my-cart.jsx";
import Item from "./item.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/item-details/:id",
    element: <ItemDetails />,
  },

  {
    path: "/add-item",
    element: <AddItem />,
  },

  {
    path: "auth/login",
    element: <Login />,
  },

  {
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/my-cart",
    element: <MyCart />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
