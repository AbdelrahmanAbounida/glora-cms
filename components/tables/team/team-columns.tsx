"use client";

import { UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown, Copy, Trash, Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
      const role = row.getValue("role") as UserRole;
      return (
        <div
          className={cn(
            "flex items-center gap-2 max-w-[150px] text-xs text-gray-200 text-center justify-center p-1 rounded-md",
            role == "AGENCY_ADMIN" ||
              (role == "AGENCY_OWNER" && "bg-green-800"),
            role == "SUBACCOUNT_USER" && "bg-yellow-700",
            role == "SUBACCOUNT_GUEST" && "bg-cyan-800"
          )}
        >
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
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(member.email)}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/** TODO:: Edit user modal  */}
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Details
            </DropdownMenuItem>

            {/** TODO:: confirm delete modal  */}
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4 text-red-500" />
              Remove User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
