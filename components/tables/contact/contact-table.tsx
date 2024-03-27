import { ContactProps, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<ContactProps[]> {
  return [
    {
      name: "Abdel yousef",
      active: true,
      createdDate: new Date(12, 3, 2023),
      email: "abdel@gmail.com",
      totalValue: 1234,
    },
    {
      name: "Mohamed Sami",
      active: false,
      createdDate: new Date(12, 7, 2019),
      email: "mo@yahoo.com",
      totalValue: 6542,
    },
  ];
}

export default async function ContactTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-5 p-0 mt-3">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
