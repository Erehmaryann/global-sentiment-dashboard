import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/// <reference types="vite/client" />

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === "production" ? "/global-sentiment-dashboard/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: "0.0.0.0", // Allow connections from all hosts
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Optimize for performance
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
      },
    },
  },
}));
