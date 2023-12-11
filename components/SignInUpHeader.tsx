import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const SignInUpHeader = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-5 p-6">
      <Link href="/" className="ml-4 lg:ml-0">
        <Image
          src="/travelyLogo.svg"
          alt="LOGO"
          width={120}
          height={48}
          priority
        />
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
  );
};

export default SignInUpHeader;
