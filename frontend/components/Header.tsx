"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import Container from "./ui/Container";
import { Button } from "./ui/Button";
import Copyright from "./CopyRight";

import { Sun, Moon, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { useState } from "react";
import { ProfileButton } from "./ui/ProfileButton";

const routes = [
  {
    href: "/flights",
    label: "Flights",
  },
  {
    href: "/hotels",
    label: "Hotels",
  },
  {
    href: "/taxis",
    label: "Taxis",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/services",
    label: "Services",
  },
];

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="mx-auto max-w-7xl sm:flex sm:justify-between p-4 sticky top-0 bg-white bg-opacity-80 backdrop-blur-md z-10 rounded-b-md dark:bg-gray-800 dark:bg-opacity-80">
      <Container>
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="ml-4 lg:ml-0">
              <Image
                src="/travelyLogo.svg"
                alt="LOGO"
                width={120}
                height={48}
                priority
              />
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route) => (
              <Button asChild variant="ghost" key={route.href}>
                <Link
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center ">
            <div className="hidden md:block mx-3">
              <ProfileButton />
            </div>

            {/* <Link href="sign-up" className="hidden md:block">
              <Button
                className="flex items-center justify-between gap-2 mr-6 "
                variant="default"
              >
                <User size={22} />
                <h1>Sign up</h1>
              </Button>
            </Link> */}

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mr-2 sm:mr-1"
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Sheet>
              <SheetTrigger className="mr-3">
                <Menu className="h-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col justify-between mt-[40px] gap-y-5">
                  <div className="flex items-center justify-end">
                    <ProfileButton />
                  </div>
                  <nav className="flex flex-col gap-y-2">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        className="block px-4 py-2 text-lg border-b border-b-gray-100 "
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>
                  <Link href="sign-up" className="w-full">
                    <Button
                      className="flex items-center justify-center  gap-2 w-full"
                      variant="default"
                    >
                      <User />
                      <h1>Sign up</h1>
                    </Button>
                  </Link>
                </div>
                <div className="absolute bottom-4 w-full right-0 flex items-center justify-center border-t border-r-slate-300 pt-2">
                  <Copyright />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
