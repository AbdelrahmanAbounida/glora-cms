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

const SidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger className="flex md:hidden">Open</SheetTrigger>
      <SheetContent side={"left"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
