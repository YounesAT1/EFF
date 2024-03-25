"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { axiosClient } from "@/api/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  login: (data: any) => Promise<void>;
  getUser: () => Promise<void>;
  error: string;
  isLoading: boolean;
  user: null;
};

const AuthContext = createContext<AuthContextType>({
  login: function (data: any): Promise<void> {
    throw new Error("Function not implemented.");
  },
  getUser: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  error: "",
  isLoading: false,
  user: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const csrf = () => axiosClient.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axiosClient.get("/api/user");
    setUser(data);
  };

  const login = async ({ ...data }) => {
    setIsLoading(true);
    try {
      await csrf();
      const res = await axiosClient.post("/login", data);
      console.log(res);

      if (res.status === 204) {
        getUser();
        router.push("/");
        toast.success("Sign in successfully");
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        setError(error.response.data.errors.email);
      } else {
        setError("Something went wrong!");
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    login,
    getUser,
    error,
    isLoading,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
