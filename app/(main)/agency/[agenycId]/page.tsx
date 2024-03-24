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
  return <div className="text-white">{params.agencyId}</div>;
};

export default AgencyPage;
