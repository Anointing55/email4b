// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Initialize authentication state from localStorage (client only)
  useEffect(() => {
    try {
      const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Replace this with your real API request
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser: User = { id: "1", email };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Replace this with your real API request
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser: User = { id: "1", email };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
