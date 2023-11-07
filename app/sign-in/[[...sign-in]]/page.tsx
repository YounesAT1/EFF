"use client";
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
import { Moon, Sun } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Please enter a valid first name.",
  }),
  lastName: z.string().min(2, {
    message: "Please enter a valid last name.",
  }),
  email: z.string().min(2, {
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Please enter a valid password.",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Passwords do not match.",
  }),
});

const SignInPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    form.reset();
  };

  const { theme, setTheme } = useTheme();

  return (
    <Container>
      <header className="flex items-center justify-between px-12 p-6">
        <Link href="/" className="ml-4 lg:ml-0">
          <h1 className="text-xl font-bold text-purple-700 dark:text-purple-300">
            Travely
          </h1>
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
      <div className="flex items-center  justify-center h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
            method="POST"
          >
            <div className="flex items-center justify-center gap-2">
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
                        placeholder="First Name..."
                        {...field}
                        id="firstName"
                        type="text"
                        name="firstName"
                      />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-l" htmlFor="password">
                    password :
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*******"
                      {...field}
                      id="password"
                      type="password"
                      name="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-l" htmlFor="passwordConfirmation">
                    Confirm Password :
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      id="passwordConfirmation"
                      type="password"
                      name="passwordConfirmation"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <p className="font-semibold text-gray-700 text-center dark:text-white">
              Already a member ?{" "}
              <Link href="sign-up" className="font-bold text-purple-700">
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default SignInPage;
