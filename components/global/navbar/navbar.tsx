import React from "react";
import SidebarMobile from "../sidebar/sidebar-mobile";
import ProfileAvatar from "./profile-avatar";
import NotificationAvatar from "./notification-avatar";
import { ModeToggleAvatar } from "./mode-toggle-avatar";

const Navbar = () => {
  return (
    <div className="flex  w-full items-center justify-between p-5">
      <SidebarMobile />

      <div className="flex space-x-3 md:ml-auto">
        <ProfileAvatar />
        <NotificationAvatar />
        <ModeToggleAvatar />
      </div>
    </div>
  );
};

export default Navbar;
