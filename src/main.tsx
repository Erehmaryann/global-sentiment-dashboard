import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import {
  RouterProvider,
} from "react-router";

import { Toaster } from "react-hot-toast";
import { Loader2 } from 'lucide-react';

import { router } from './router';
import './index.css';
import { ThemeProvider } from './components/theme/theme-provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-screen text-3xl font-bold bg-white">
          Loading
          <Loader2 className="animate-spin ml-2" />
        </div>
      }
    >
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: "white",
                color: "green",
                fontSize: "13.5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                fontWeight: "bold",
              },
            },
            error: {
              style: {
                background: "white",
                color: "red",
                fontSize: "13.5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                fontWeight: "bold",
              },
            },
          }}
        />
      </ThemeProvider>
    </Suspense>
  </StrictMode>,
);
