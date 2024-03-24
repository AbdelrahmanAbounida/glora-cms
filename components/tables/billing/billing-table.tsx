import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      description: "728ed52f",
      invoiceId: "sk-asd32r23x3rc",
      date: new Date("5-10-2024"),
      paid: "paid",
      amount: 100,
    },
  ];
}

export default async function BillingTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-5 p-0 mt-3">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
