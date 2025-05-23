import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode; }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (token) {
          // Validate token and get user info
          const userData = localStorage.getItem("user_data");
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication - in real app, this would be an API call
    if (email === "demo@example.com" && password === "password") {
      const userData = {
        id: "1",
        name: "Demo User",
        email: email,
        avatar: "/avatars/demo-user.jpg",
      };

      localStorage.setItem("auth_token", "mock_token");
      localStorage.setItem("user_data", JSON.stringify(userData));
      setUser(userData);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: "/avatars/default.jpg",
    };

    localStorage.setItem("auth_token", "mock_token");
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
// This hook allows components to access the authentication context easily
// and provides a way to consume the context without needing to use the useContext hook directly.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
