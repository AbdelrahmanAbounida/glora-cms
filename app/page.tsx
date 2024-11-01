import React from "react";
import AgencyCreateForm from "./(main)/agency/_components/agency-create-form";
import { redirect } from "next/navigation";

const Agency = () => {
  // TODO:: This is the landing page with login that should redirect user to agency

  return redirect("/agency");
  // return <div className="w-full p-3 flex flex-col spay-y-3">Landing Page</div>;
};

export default Agency;
