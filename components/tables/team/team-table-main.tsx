"use client";
import { useTeamMembers } from "@/hooks/use-team";
import { TeamProps, columns } from "./team-columns";
import { DataTable } from "./team-data-table";
import TableSkeleton from "../table-skeleton";

// async function getData(): Promise<TeamProps[]> {
//   return [
//     {
//       name: "Abdelrahman Yousef",
//       image: "/assets/pic.jpeg",
//       email: "abdel@example.com",
//       role: "AGENCY_OWNER",
//     },
//     {
//       name: "Mohamed Ibrahim",
//       image: "/assets/pic.jpeg",
//       email: "mohamed@gmail.com",
//       role: "SUBACCOUNT_GUEST",
//     },
//   ];
// }

export default function TeamPage() {
  // const data = await getData();

  const { data, isLoading } = useTeamMembers();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data as any} />
    </div>
  );
}
