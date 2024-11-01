import Navbar from "@/components/global/navbar/navbar";
import Sidebar from "@/components/global/sidebar/siedbar";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    subaccountId: string;
  };
}>) {
  console.log({ subaccountId: params.subaccountId });
  return (
    <div className="flex w-full h-screen">
      {/** sidebar */}
      <div className="hidden md:flex w-[350px]  space-y-3 fixed inset-y-0 top-0 left-0 h-screen  shadow-md">
        <Sidebar sideType={"subaccount"} agencyId={params.subaccountId} />
      </div>

      <div className="w-full flex md:pl-[350px]  flex-col">
        {/** Navbar */}
        <Navbar />

        {/** Main page */}
        <div className=" bg-muted/20  m-5 rounded-sm my-2 p-3  h-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
