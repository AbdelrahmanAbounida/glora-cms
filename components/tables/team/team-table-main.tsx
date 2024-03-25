import { TeamProps, columns } from "./team-columns";
import { DataTable } from "./team-data-table";

async function getData(): Promise<TeamProps[]> {
  return [
    {
      name: "Abdelrahman Yousef",
      image: "/assets/pic.jpeg",
      email: "abdel@example.com",
      role: "AGENCY_OWNER",
    },
    {
      name: "Mohamed Ibrahim",
      image: "/assets/pic.jpeg",
      email: "mohamed@gmail.com",
      role: "SUBACCOUNT_GUEST",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
