"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarOption = ({ option }: { option: any }) => {
  const Icon = option?.icon;

  const pathname = usePathname();
  const isActive =
    pathname === option?.href ||
    (pathname.startsWith(option?.href) && pathname !== "/");

  return (
    <Link
      href={option?.href}
      className={cn(
        "flex space-x-3 p-2 w-full font-normal hover:bg-violet-500 ",
        isActive && "bg-violet-500 text-white font-bold"
      )}
    >
      <Icon className="w-4 h-4" />
      <p className="text-sm ">{option?.name}</p>
    </Link>
  );
};

export default SidebarOption;
