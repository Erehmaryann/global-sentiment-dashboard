import { lazy } from "react";

// Lazy load auth components
const Reports = lazy(() => import("./"));


const reportsRoutes = {
  path: "/reports",
  children: [
    {
      path: "",
      Component: Reports,
    },
    {
      path: ":reportType",
      Component: Reports,
    },
  ],
};

export default reportsRoutes;
