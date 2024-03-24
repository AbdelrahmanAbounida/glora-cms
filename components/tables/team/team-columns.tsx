"use client";

import { UserRole } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type TeamProps = {
  name: string;
  image: string;
  role: UserRole;
  email: string;
};

export const columns: ColumnDef<TeamProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];
