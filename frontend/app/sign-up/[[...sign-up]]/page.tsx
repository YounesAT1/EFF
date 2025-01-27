"use client";
import "./signUp.css";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import SignInUpHeader from "@/components/SignInUpHeader";

import { ArrowRight, Eye, EyeOff, Plane } from "lucide-react";
import useAuthContext from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Please enter a valid first name.",
    }),
    lastName: z.string().min(2, {
      message: "Please enter a valid last name.",
    }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
            value
          ),
        {
          message:
            "Password must include at least one uppercase, one lowercase, one number and one symbol.",
        }
      ),
    password_confirmation: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.password_confirmation;
    },
    {
      message: "Passwords must match!",
      path: ["password_confirmation"],
    }
  );

const SignUpPage = () => {
  const { isLoading, register, emptyForm, error } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await register(data).then(() => {
      if (emptyForm && !error) {
        form.reset();
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container>
      <SignInUpHeader />
      <div className="flex justify-center items-center gap-3 ">
        <h1 className="text-2xl text-center text-gray-600 font-bold dark:text-gray-200 ">
          Sign Up
        </h1>
        <Plane
          width={28}
          height={28}
          className="text-gray-600  dark:text-gray-200"
        />
      </div>
      <p className="font-semibold text-gray-700 text-center dark:text-white flex justify-center mb-6">
        Already a member ?{" "}
        <Link
          href="sign-in"
          className="font-bold text-purple-500 ml-2 flex gap-1"
        >
          Sign in
          <ArrowRight className="arrow-icon" />
        </Link>
      </p>
      <div className="flex items-center  justify-center  ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 "
            method="POST"
            autoComplete="off"
          >
            <div className="flex items-center justify-between gap-2 ">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-l" htmlFor="firstName">
                      First Name :
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John"
                        id="firstName"
                        type="text"
                        name="firstName"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-l" htmlFor="lastName">
                      {" "}
                      Last Name :
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        id="lastName"
                        type="text"
                        name="lastName"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-700" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-l" htmlFor="email">
                    Email :
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John@gmail.com"
                      {...field}
                      id="email"
                      type="email"
                      name="email"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-700" />
                  {error && (
                    <FormMessage className="dark:text-red-700">
                      {error}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel className="text-l" htmlFor="password">
                      password :
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*******"
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-700" />
                  </FormItem>
                )}
              />
              {showPassword ? (
                <Eye
                  onClick={handleTogglePassword}
                  className="absolute right-2 top-[2.38rem] cursor-pointer text-gray-700 dark:text-gray-200"
                />
              ) : (
                <EyeOff
                  onClick={handleTogglePassword}
                  className="absolute right-2 top-[2.38rem] cursor-pointer text-gray-700 dark:text-gray-200"
                />
              )}
            </div>
            <div className="flex items-center justify-between relative">
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      className="text-l"
                      htmlFor="password_confirmation"
                    >
                      Confirm Password :
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        id="passwordComfirmation"
                        type={showPassword ? "text" : "password"}
                        name="passwordComfirmation"
                      />
                    </FormControl>
                    <FormMessage className="dark:text-red-700" />
                  </FormItem>
                )}
              />
              {showPassword ? (
                <Eye
                  onClick={handleTogglePassword}
                  className="absolute right-2 top-[2.38rem] cursor-pointer text-gray-700 dark:text-gray-200"
                />
              ) : (
                <EyeOff
                  onClick={handleTogglePassword}
                  className="absolute right-2 top-[2.38rem] cursor-pointer text-gray-700 dark:text-gray-200"
                />
              )}
            </div>
            <Button
              type="submit"
              className={`w-full flex items-center justify-center ${
                isLoading ? "opacity-70  cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Sign up"}
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default SignUpPage;
