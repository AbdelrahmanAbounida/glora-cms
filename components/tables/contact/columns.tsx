"use client";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns/format";

export type ContactProps = {
  name: string;
  email: string;
  createdDate: Date;
  active: boolean;
  totalValue: number;
};

export const columns: ColumnDef<ContactProps>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("active");
      return (
        <div
          className={cn(
            "font-medium rounded-xl w-[80px] flex items-center justify-center text-left p-1 ",
            isActive ? "bg-green-700/90" : "bg-red-700/90"
          )}
        >
          {isActive ? "Active" : "Inactive"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "CreatedDate",
    cell: ({ row }) => {
      const val = format(row.getValue("createdDate"), "dd-mm-yyyy");
      return <div>{val}</div>;
    },
  },

  {
    accessorKey: "totalValue",
    header: "Total Value",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalValue"));
      const formatted = formatPrice(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
];
