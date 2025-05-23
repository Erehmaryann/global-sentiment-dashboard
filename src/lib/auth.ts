import type { User } from "@/types/auth";

export async function getCurrentUser(): Promise<User | null> {
  try {
    // In a real app, this would validate the token with your backend
    const token = localStorage.getItem("auth_token");
    if (!token) return null;

    const userData = localStorage.getItem("user_data");
    if (!userData) return null;

    return JSON.parse(userData);
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("auth_token");
}
