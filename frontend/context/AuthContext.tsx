"use client";

import React, { createContext, useContext, useState } from "react";
import { axiosClient } from "@/api/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

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
  emptyForm: boolean;
  login: (data: loginPropsType) => Promise<void>;
  register: (data: registerPropsType) => Promise<void>;
  getUser: () => Promise<void>;
  logout: () => void;
};

type loginPropsType = {
  email: string;
  password: string;
};

type registerPropsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: false,
  error: null,
  emptyForm: false,
  login: async () => {},
  register: async () => {},
  getUser: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [emptyForm, setEmptyForm] = useState(false);
  const router = useRouter();
  const randomToken = uuidv4();

  const csrfToken = () => axiosClient.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      const { data } = await axiosClient.get("/api/user");
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const login = async ({ ...data }: loginPropsType): Promise<void> => {
    setIsLoading(true);
    try {
      await csrfToken();
      const res = await axiosClient.post("/login", data);

      if (res.status === 204) {
        setEmptyForm(true);
        await getUser();
        router.push("/");
        toast.success("Sign in successfully");
        Cookies.set("AUTHENTICATED_TOKEN", randomToken);
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

  const register = async ({ ...data }: registerPropsType) => {
    setIsLoading(true);

    try {
      await csrfToken();
      const res = await axiosClient.post("/register", data);

      if (res.status === 204) {
        setEmptyForm(true);
        await getUser();
        router.push("/");
        toast.success("Sign up successfully");
        Cookies.set("AUTHENTICATED_TOKEN", randomToken);
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
      setError(null);
      setEmptyForm(true);
      toast.success("Logged out successfully");
      Cookies.remove("AUTHENTICATED_TOKEN");
      router.push("/");
    });
  };

  return (
    <AuthContext.Provider
      value={{
        getUser,
        login,
        register,
        user,
        error,
        isLoading,
        emptyForm,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
