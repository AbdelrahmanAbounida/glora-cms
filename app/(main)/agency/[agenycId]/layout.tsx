import Navbar from "@/components/global/navbar/navbar";
import Sidebar from "@/components/global/sidebar/siedbar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    agenycId: string;
  };
}>) {
  // check if agency exists and if not redirect to create agency
  const exist = await db.agency.findFirst({
    where: {
      id: params.agenycId,
    },
  });

  if (!exist) {
    return redirect("/agency");
  }

  return (
    <div className="flex w-full h-screen">
      {/** sidebar */}
      <div className="hidden md:flex flex-col w-[350px]  space-y-3 fixed inset-y-0 top-0 left-0 h-screen  shadow-md">
        {" "}
        <div className="w-full">
          <NextTopLoader color="#4F46E5" speed={300} />
        </div>
        <Sidebar sideType={"agency"} agencyId={params.agenycId} />
      </div>

      <div className="w-full flex md:pl-[350px]  flex-col">
        {/** Navbar */}
        <Navbar sideType={"agency"} agencyId={params.agenycId} />

        {/** Main page */}
        <div className=" bg-muted/20  m-5 rounded-sm my-2 p-3 h-full ">
          {children}
        </div>
      </div>
    </div>
  );
}
