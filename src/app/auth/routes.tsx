import { lazy } from "react";
import AuthLayout from "./layout";

// Lazy load auth components
const Login = lazy(() => import("./login"));
const Register = lazy(() => import("./register"));

const authRoutes = {
  path: "/auth",
  Component: AuthLayout,
  children: [
    {
      path: "login",
      Component: Login,
    },
    {
      path: "register",
      Component: Register,
    },
  ],
};

export default authRoutes;
