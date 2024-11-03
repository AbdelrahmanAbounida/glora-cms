import React from "react";
import SidebarMobile from "../sidebar/sidebar-mobile";
import ProfileAvatar from "./profile-avatar";
import { ModeToggleAvatar } from "./mode-toggle-avatar";
import NotificationSlider from "./notificatoin-slider";

const Navbar = ({
  agencyId,
  sideType,
}: {
  agencyId: string;
  sideType: "agency" | "subaccount";
}) => {
  return (
    <div className="flex  w-full items-center justify-between p-5">
      <SidebarMobile sideType={sideType} agencyId={agencyId} />

      <div className="flex space-x-3 md:ml-auto">
        <ProfileAvatar />
        <NotificationSlider />
        <ModeToggleAvatar />
      </div>
    </div>
  );
};

export default Navbar;
