import Navbar from "@/components/global/navbar/navbar";
import Sidebar from "@/components/global/sidebar/siedbar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const AgencyPage = async ({
  params,
}: {
  params: {
    agenycId: string;
  };
}) => {
  return redirect(`/agency/${params.agenycId}/dashboard`);
};

export default AgencyPage;
