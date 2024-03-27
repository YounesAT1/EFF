"use client";

import React, { createContext, useContext, useState } from "react";
import { axiosClient } from "@/api/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

type AuthProviderProps = {
  children: React.ReactNode;
};

type User = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};

type AuthContextProps = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (data: any) => Promise<void>;
  getUser: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  getUser: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const csrfToken = () => axiosClient.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      const { data } = await axiosClient.get("/api/user");
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const login = async (data: any): Promise<void> => {
    setIsLoading(true);
    try {
      await csrfToken();
      const res = await axiosClient.post("/login", data);

      if (res.status === 204) {
        await getUser();
        router.push("/");
        toast.success("Sign in successfully");
        Cookies.set("LOGGED_IN_TOKEN", "123456789");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setError(error.response.data.errors.email);
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    axiosClient.post("/logout").then(() => {
      setUser(null);
      toast.success("Logged out successfully");
      Cookies.remove("LOGGED_IN_TOKEN");
      router.push("/");
    });
  };

  return (
    <AuthContext.Provider
      value={{ getUser, login, user, error, isLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
