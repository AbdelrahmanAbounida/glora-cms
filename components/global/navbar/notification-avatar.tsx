"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth/logout";
import {
  Bell,
  BellDotIcon,
  LogOut,
  LogOutIcon,
  Settings,
  SettingsIcon,
} from "lucide-react";

interface profileSettingsProps {
  image?: string;
  name?: string;
  email?: string;
}

const NotificationAvatar = ({ image, name, email }: profileSettingsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:scale-105">
        <Avatar className="border  focus:ring-0 outline-none">
          <AvatarFallback
            className={cn(
              !image &&
                "dark:bg-violet-800 bg-violet-500 text-white border-violet-500 focus:ring-0"
            )}
          >
            <Bell className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[270px] mr-5 space-y-2">
        <DropdownMenuLabel className="pb-0">{name}</DropdownMenuLabel>
        <span className="text-slate-500 font-normal text-sm p-2">{email}</span>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex gap-2 font-medium my-1">
          <SettingsIcon className="w-5 h-5" />
          Settings
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          onClick={() => logout()}
          className="cursor-pointer flex gap-2 font-medium my-1"
        >
          <LogOutIcon className="w-5 h-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationAvatar;
