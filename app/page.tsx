import React from "react";
import AgencyCreateForm from "./(main)/agency/_components/agency-create-form";

const Agency = () => {
  return (
    <div className="w-full p-3 flex flex-col spay-y-3">
      <h1 className="text-3xl">Create An Agency</h1>

      <AgencyCreateForm />
    </div>
  );
};

export default Agency;
