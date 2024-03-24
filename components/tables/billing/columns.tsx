"use client";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns/format";

export type BillingProps = {
  description: string;
  invoiceId: string;
  date: Date;
  paid: "paid" | "declined";
  amount: number;
};

export const columns: ColumnDef<BillingProps>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "invoiceId",
    header: "InvoiceId",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = parseFloat(row.getValue("date"));
      const today = new Date();
      return <div className="font-medium">{format(today, "MM-dd-yyyy")}</div>;
    },
  },
  {
    accessorKey: "paid",
    header: "Paid",
    cell: ({ row }) => {
      const val = row.getValue("paid");
      return (
        <div
          className={cn(
            val == "paid" ? "bg-green-600" : "bg-red-600",
            "text-white text-md w-16 rounded-xl flex items-center justify-center text-left "
          )}
        >
          {val as string}
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Ammount", //() => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = formatPrice(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
];
