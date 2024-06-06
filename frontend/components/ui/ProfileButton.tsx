"use client";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getInitials } from "@/lib/helpers";
import useAuthContext from "@/context/AuthContext";
import Link from "next/link";
import Loader from "./Loader";
import { axiosClient } from "@/api/axios";

interface UserProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  picture?: string;
}

interface ProfileButtonProps {
  user: UserProps | null;
}

export function ProfileButton({ user }: ProfileButtonProps) {
  const initials = getInitials({
    firstName: user?.firstName!,
    lastName: user?.lastName!,
  });

  const { logout } = useAuthContext();
  // console.log(user?.picture);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {user ? (
            user.picture ? (
              <AvatarImage
                src={`http://localhost:8000/${user.picture}`}
                alt={`@${user.firstName}`}
              />
            ) : (
              <AvatarFallback className="font-medium">
                {initials}
              </AvatarFallback>
            )
          ) : (
            <Loader />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          {user?.firstName} {user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            {/* <span>Profile</span> */}
            <Link href={`/profile/${user?.id}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <button>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
