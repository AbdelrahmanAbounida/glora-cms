import React from "react";
import AgencyDetails from "../../_components/agency-details";
import UserDetail from "../../_components/user-detail";

const Settings = () => {
  return (
    <div className="flex p-3 items-start w-full  space-x-5 gap-3">
      {/** Agency Details */}
      <AgencyDetails />

      {/** User Details */}
      <UserDetail />
    </div>
  );
};

export default Settings;
