"use client";
import "./signIn.css";
import Container from "@/components/ui/Container";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useTheme } from "next-themes";

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
import { ArrowRight, Eye, EyeOff, Moon, Plane, Sun } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters long.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one number.",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one symbol.",
    }),
});
const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    form.reset();
  };

  const { theme, setTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container>
      <header className="flex items-center justify-between px-12 p-6">
        <Link href="/" className="ml-4 lg:ml-0">
          <Image src="/travelyLogo.svg" alt="LOGO" width={120} height={48} />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Theme"
          className="mr-6"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </header>
      <div className="flex justify-center items-center gap-3 mb-4 ">
        <h1 className="text-2xl text-center text-gray-600 font-bold dark:text-gray-200 ">
          Sign In
        </h1>
        <Plane
          width={28}
          height={28}
          className="text-gray-600  dark:text-gray-200"
        />
      </div>
      <p className="font-semibold text-gray-700 text-center dark:text-white flex justify-center mb-6">
        Do not have an accout ?{" "}
        <Link
          href="sign-up"
          className="font-bold text-purple-500 flex gap-1 ml-2"
        >
          {" "}
          Sign up
          <ArrowRight />
        </Link>
      </p>
      <div className="flex items-center  justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            method="POST"
            autoComplete="off"
          >
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

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default SignInPage;
