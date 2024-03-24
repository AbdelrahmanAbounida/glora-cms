"use client";
import {
  CalendarIcon,
  DashboardIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
  StackIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import SidebarOption from "./sidebar-option";
import { MdAccountCircle, MdOutlinePayment } from "react-icons/md";
import {
  BookAIcon,
  NotebookIcon,
  Settings,
  Settings2,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SidebarMenuList({ agencyId }: { agencyId: string }) {
  const path = usePathname();

  return (
    <Command className="h-full w-full ">
      <CommandInput className="" placeholder="Search." />
      <CommandList className="h-full ">
        <CommandEmpty>No options found.</CommandEmpty>
        <CommandGroup className="h-full">
          <CommandItem className="my-3 p-0">
            <Link
              href={`/agency/${agencyId}/dashboard`}
              className={cn(
                "flex items-center w-full  p-2 rounded-md ",
                path.includes("dashboard") && "bg-violet-800"
              )}
            >
              <DashboardIcon className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </CommandItem>

          <CommandItem className="my-3 p-0">
            <Link
              href={`/agency/${agencyId}/billing`}
              className={cn(
                "flex items-center w-full text-white  p-2 rounded-md",
                path.includes("billing") && "bg-violet-800"
              )}
            >
              <MdOutlinePayment className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>
          </CommandItem>

          <CommandItem className="my-3 p-0">
            <Link
              href={`/agency/${agencyId}/launchpad`}
              className={cn(
                "flex items-center w-full  p-2 rounded-md",
                path.includes("launchpad") && "bg-violet-800"
              )}
            >
              <BookAIcon className="mr-2 h-4 w-4" />
              <span>Launchpad</span>
            </Link>
          </CommandItem>

          <CommandItem className="my-3 p-0">
            <Link
              href={`/agency/${agencyId}/settings`}
              className={cn(
                "flex items-center w-full  p-2 rounded-md",
                path.includes("settings") && "bg-violet-800"
              )}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </CommandItem>

          <CommandItem className="my-3 p-0">
            <Link
              href={`/agency/${agencyId}/subaccounts`}
              className={cn(
                "flex items-center w-full  p-2 rounded-md",
                path.includes("subaccounts") && "bg-violet-800"
              )}
            >
              <MdAccountCircle className="mr-2 h-4 w-4" />
              <span>Subaccounts</span>
            </Link>
          </CommandItem>

          <CommandItem className="my-3 p-0">
            <Link
              href={`/agency/${agencyId}/team`}
              className={cn(
                "flex items-center w-full  p-2 rounded-md",
                path.includes("team") && "bg-violet-800"
              )}
            >
              <StackIcon className="mr-2 h-4 w-4" />
              <span>Team</span>
            </Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
