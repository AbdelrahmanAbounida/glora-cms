import Navbar from "@/components/global/navbar/navbar";
import Sidebar from "@/components/global/sidebar/siedbar";
import React from "react";

const AgencyPage = ({
  params,
}: {
  params: {
    agencyId: string;
  };
}) => {
  return (
    <div className="flex w-full ">
      {/** sidebar */}
      <div className="hidden md:flex w-[350px]  space-y-3 fixed inset-y-0 top-0 left-0 h-screen border-r shadow-md">
        {" "}
        {/** w-[200px] */}
        <Sidebar />
      </div>

      <div className="w-full flex md:pl-[350px]  flex-col">
        {/** Navbar */}
        <Navbar />

        {/** Main page */}
        <div className=" border my-2 p-3 h-full "></div>
      </div>
    </div>
  );
};

export default AgencyPage;
