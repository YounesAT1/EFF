"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, User } from "lucide-react";
import Container from "./ui/Container";
import { Button } from "./ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Copyright from "./CopyRight";

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
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold text-purple-700 dark:text-purple-300">
                Travely
              </h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, index) => (
              <Button asChild variant="ghost" key={index}>
                <Link
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            {/* <ProfileButton /> */}
            <Link href="sign-in">
              <Button
                className="flex items-center justify-between gap-2 mr-6"
                variant="default"
              >
                <User />
                <h1>Sign in</h1>
              </Button>
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
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col justify-between h-full">
                  <nav className="flex flex-col gap-4">
                    {routes.map((route, index) => (
                      <>
                        <Link
                          key={index}
                          href={route.href}
                          className="block px-4 py-2 text-lg 
                          "
                        >
                          {route.label}
                        </Link>
                      </>
                    ))}
                  </nav>
                  <div className="flex items-center justify-center">
                    <Copyright />
                  </div>
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
