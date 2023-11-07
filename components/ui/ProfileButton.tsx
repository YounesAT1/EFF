"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { Button } from "./Button";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

const ProfileButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="mr-6">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/favicon.ico" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer ">
              <Link href="/profile" className="flex  items-center gap-2">
                <User strokeWidth={1} />
                <h1 className="text-l ">Profile</h1>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link href="/profile/logout" className="flex  items-center gap-2">
                <LogOut strokeWidth={1} /> <h1 className="text-l ">Log out</h1>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="sign-in">
          <Button
            className="flex items-center justify-between gap-2 mr-6"
            variant="default"
          >
            <User />
            <h1>Sign in</h1>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProfileButton;
