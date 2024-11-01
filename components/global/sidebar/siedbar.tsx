import React from "react";
import SidebarOption from "./sidebar-option";
import PopOverAccounts from "./accounts-switcher";
import { Separator } from "@/components/ui/separator";
import { SidebarMenuList } from "./sidebar-menu-list";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Logo from "@/components/logo";

const Sidebar = ({
  sidebarOptoins,
  agencyId,
  sideType,
}: {
  sidebarOptoins?: any[];
  agencyId: string;
  sideType: "agency" | "subaccount";
}) => {
  return (
    <div className=" p-3 w-full   ">
      {/** logo */}
      {/** TODO:: add logo */}
      <AspectRatio ratio={16 / 5} className=" flex items-center justify-start">
        {/* <Image src="/logo.png"  className="rounded-md object-cover" /> */}
        <Logo className="" />
      </AspectRatio>

      {/** Popover accounts */}
      <PopOverAccounts />

      {/** Menu list header */}
      <div className="flex flex-col">
        <p className="text-muted-foreground text-sm mt-7 capitalize">
          Menu Links
        </p>
        <Separator className="mt-2 mb-5" />
      </div>

      {/* {sidebarOptoins.map((option, index) => (
        <SidebarOption key={index} option={option} />
      ))} */}

      {/** Menu List */}
      <SidebarMenuList sideType={sideType} agencyId={agencyId} />
    </div>
  );
};

export default Sidebar;
