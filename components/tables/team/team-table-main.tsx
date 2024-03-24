import { Payment } from "../billing/columns";
import { columns } from "./team-columns";
import { DataTable } from "./team-data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
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

export default async function TeamTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
