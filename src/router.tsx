
import { lazy } from "react";
import { motion } from "framer-motion";
import { createBrowserRouter, Navigate, Outlet, useNavigation } from "react-router";
import authRoutes from "./app/auth/routes";
import DashboardLayout from "./components/layout";
import { AuthProvider } from "./components/auth/auth-provider";
import { SidebarProvider } from "./components/ui/sidebar";

// Lazy load components
const Overview = lazy(() => import("./app/dashboard/overview"));
const Analytics = lazy(() => import("./app/dashboard/analytics"));
const Reports = lazy(() => import("./app/dashboard/reports"));
const Settings = lazy(() => import("./app/dashboard/settings"));

const routes = [
  {
    path: "/",
    Component: () => <RootRoute />,
    children: [
      {
        index: true,
        Component: () => <Navigate to="/overview" replace />,
      },
      authRoutes,
      {
        // loader: checkAuth, // Uncomment when implementing auth check
        Component: DashboardLayout,
        children: [
          {
            path: "/overview",
            Component: Overview,
          },
          {
            path: "/analytics",
            Component: Analytics,
          },
          {
            path: "/analytics/:type",
            Component: Analytics,
          },
          {
            path: "/reports",
            Component: Reports,
          },
          {
            path: "/reports/:reportType",
            Component: Reports,
          },
          {
            path: "/settings",
            Component: Settings,
          },
          {
            path: "/settings/:section",
            Component: Settings,
          },
        ],
      },
    ],
    errorElement: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600">
            The route you&apos;re looking for is either under construction or unavailable. Contact the Developer
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    ),
  },
];

export const router = createBrowserRouter(routes, {
  future: {
  },
});

// eslint-disable-next-line react-refresh/only-export-components
function RootRoute() {
  const navigation = useNavigation();

  return (
    <AuthProvider>
      <SidebarProvider>
        <motion.div
          className="h-[4px] bg-primary dark:bg-slate-200 fixed top-0 left-0 z-[1030] pointer-events-none"
          animate={{
            width: navigation.state === "idle" ? "100%" : ["5%", "5%", "10%", "10%", "25%", "30%"],
            opacity: navigation.state === "idle" ? [1, 1, 1, 0, 0, 0] : 1,
          }}
          transition={{
            duration: navigation.state === "idle" ? 0.5 : 2,
            ease: "easeInOut",
          }}
        />
        <Outlet />
      </SidebarProvider>
    </AuthProvider>
  );
}
