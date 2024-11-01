import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./siedbar";

const SidebarMobile = ({
  agencyId,
  sideType,
}: {
  agencyId: string;
  sideType: "agency" | "subaccount";
}) => {
  return (
    <Sheet>
      <SheetTrigger className="flex md:hidden">Open</SheetTrigger>
      <SheetContent side={"left"}>
        <Sidebar sideType={sideType} agencyId={agencyId} />{" "}
        {/** TODO:: Check for subaccount or agency */}
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
