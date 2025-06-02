import { lazy } from "react";

// Lazy load auth components
const Analytics = lazy(() => import("./index"));

const analyticsRoutes = {
  path: "/analytics",
  children: [
    {
      path: "",
      Component: Analytics,
    },
    {
      path: ":type",
      Component: Analytics,
    },
  ],
};

export default analyticsRoutes;
