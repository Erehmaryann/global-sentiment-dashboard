import { lazy } from "react";

// Lazy load auth components
const Settings = lazy(() => import("./"));


const settingsRoutes = {
  path: "/settings",
  children: [
    {
      path: "",
      Component: Settings,
    },
    {
      path: ":section",
      Component: Settings,
    },
  ],
};

export default settingsRoutes;
