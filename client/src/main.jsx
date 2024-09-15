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
import AddItemFormik from "./add-item-formik.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App title="Give-Away! - Discover hot Deals For Free!" />,
    errorElement: <ErrorPage title="Error!" />,
  },

  {
    path: "/item-details/:id",
    element: <ItemDetails title="Give-Away! - About Item" hasLoaded={false} />,
    errorElement: <ErrorPage title="Error!"/>,
  },

  {
    path: "/add-item",
    element: <AddItem title="Give-Away! - Add Item" />,
    errorElement: <ErrorPage title="Error!"/>,
  },

  {
    path: "/add-item-formik",
    element: <AddItemFormik title="Give-Away! - Add Item" />,
    errorElement: <ErrorPage title="Error!"/>,
  },

  {
    path: "auth/login",
    element: <Login title="Give-Away! - Login" />,
    errorElement: <ErrorPage title="Error!"/>,
  },

  {
    path: "/sign-up",
    element: <SignUp title="Give-Away! - Sign-up" />,
    errorElement: <ErrorPage title="Error!"/>,
  },

  {
    path: "/my-cart",
    element: <MyCart title="Give-Away! - My Cart" />,
    errorElement: <ErrorPage title="Error!"/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
