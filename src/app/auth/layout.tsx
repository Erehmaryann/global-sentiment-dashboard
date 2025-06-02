import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-md w-full space-y-8">
        <Outlet />
      </div>
    </div>
  );
}
