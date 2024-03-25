"use client";

import { UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type TeamProps = {
  name: string;
  image: string;
  role: UserRole;
  email: string;
};

export const columns: ColumnDef<TeamProps>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const image: string = row.getValue("image");

      return (
        <div className="flex items-center gap-3">
          <Image
            src={image || "/assets/pic.jpeg"}
            alt="profile image"
            className="object-cover rounded-full"
            width={30}
            height={30}
          />
          <p className="text-md">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <div className="flex items-center gap-2">
          <p className="text-md font-medium">{role}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4 ring-0 focus:ring-0" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuItem className="cursor-pointer">
              <Link
                className="flex items-center justify-between w-full"
                href={`#`}
              >
                Edit
              </Link>
            </DropdownMenuItem>

            <Button
              variant={"destructive"}
              className={cn(
                " font-normal bg-red-600 hover:bg-red-600/90 hover:text-white text-white w-full rounded-sm h-full p-[6px] mt-1 flex text-start justify-start"
              )}
            >
              Delete
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
