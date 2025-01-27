"use client";
import "./signIn.css";

import { useEffect, useState } from "react";
import * as z from "zod";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SignInUpHeader from "@/components/SignInUpHeader";

import { ArrowRight, Eye, EyeOff, Plane } from "lucide-react";
import useAuthContext from "@/context/AuthContext";
import Loader from "@/components/ui/Loader";
const formSchema = z.object({
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
});

const SignInPage = () => {
  const { isLoading, error, emptyForm, login } = useAuthContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await login(data).then(() => {
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
          <ArrowRight className="arrow-icon" />
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

            <Button
              type="submit"
              className={`w-full flex items-center justify-center ${
                isLoading ? "opacity-70  cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? <Loader /> : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default SignInPage;
