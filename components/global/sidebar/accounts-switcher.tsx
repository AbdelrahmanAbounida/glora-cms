import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AccountsSwitcher } from "./popover-accounts-list";
import { ArrowUpDownIcon, CompassIcon } from "lucide-react";

const PopOverAccounts = () => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="w-full mt-5 py-7 rounded-lg border-none bg-muted/50"
      >
        <Button variant="outline" className="p-3">
          <div className="w-full flex items-center  justify-between ">
            <div className="flex space-x-1 items-center ">
              <CompassIcon className="w-5 h-5" />
              <div className="flex flex-col spacy-y-1">
                <p className="font-medium">Bio Matrix</p>
                <p className="text-sm text-muted-foreground">1234 street</p>
              </div>
            </div>
            <ArrowUpDownIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <AccountsSwitcher />
      </PopoverContent>
    </Popover>
  );
};

export default PopOverAccounts;
