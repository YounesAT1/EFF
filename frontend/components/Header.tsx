"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "./ui/Container";
import { Button } from "./ui/Button";
import { Sun, Moon, Menu, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import useAuthContext from "@/context/AuthContext";
import Loader from "./ui/Loader";
import { ProfileButton } from "./ui/ProfileButton";
import Copyright from "./CopyRight";
import { useTheme } from "next-themes";
import { axiosClient } from "@/api/axios";

const routes = [
  {
    href: "/",
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
];

const Header = () => {
  const pathName = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, getUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        await getUser();
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  className={`text-sm font-medium transition-colors ${
                    route.href === pathName
                      ? "text-purple-800 font-semibold  underline-offset-2"
                      : ""
                  } `}
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center">
            {!user && !isLoading && (
              <Link href="sign-up" className="hidden md:block">
                <Button
                  className="flex items-center justify-between gap-2 mr-6 "
                  variant="default"
                >
                  <User size={22} />
                  <h1>Sign up</h1>
                </Button>
              </Link>
            )}

            {!user && isLoading && (
              <div className="mr-1">
                <Loader />
              </div>
            )}

            {user && <ProfileButton user={user} />}

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
                  {user && (
                    <div className="flex items-center justify-end">
                      <ProfileButton user={user} />
                    </div>
                  )}
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
                  {!user && (
                    <Link href="sign-up" className="w-full">
                      <Button
                        className="flex items-center justify-center  gap-2 w-full"
                        variant="default"
                      >
                        <User />
                        <h1>Sign up</h1>
                      </Button>
                    </Link>
                  )}
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
