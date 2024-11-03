"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import React from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from "@/hooks/use-notifications";
import { useCurrentSelectedAgencyOrSubaccount } from "@/hooks/use-selected-agency";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationSlider = () => {
  const { agencyId, subaccountId } = useCurrentSelectedAgencyOrSubaccount();
  const { data: notifications, isLoading } = useNotifications({ subaccountId });

  // TODO:: Filter the notifications to current subaccountId
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="border  focus:ring-0 outline-none">
          <AvatarFallback
            className={cn(
              "dark:bg-violet-800 bg-violet-500 text-white border-violet-500 focus:ring-0"
            )}
          >
            <Bell className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className=" h-full">
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription className="h-full ">
            <div className="p-3 rounded-md bg-muted/40 flex items-center justify-between">
              <p className="">Current Subaccount</p>
              <Switch />
            </div>

            {/** List of notificatoins  */}
            <div className="gap-4 flex flex-col h-full overflow-auto pt-4 pb-12 ">
              {isLoading
                ? [1, 2, 3, 1].map((notification, index) => (
                    <Skeleton className="w-full h-24 rounded-md" key={index} />
                  ))
                : notifications?.map((notification, index) => (
                    <NotificationItem key={index} />
                  ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSlider;

const NotificationItem = () => (
  <div className="bg-muted/30 rounded-lg flex  items-center gap-2 p-4 ">
    {/** 1- image for notification owner */}
    <img className="rounded-full w-9 h-9" src="/logo.png" alt="logo" />

    <div className="flex flex-col">
      {/** 2- notification content */}
      <p className="text-gray-400">
        This is a notification content to be changed later
      </p>
      {/** 3- Time */}
      <p className="text-slate-500">1/4/2024</p>
    </div>
  </div>
);
