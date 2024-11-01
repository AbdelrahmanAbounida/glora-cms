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
  CircuitBoard,
  NotebookIcon,
  Settings,
  Settings2,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SidebarMenuList({
  agencyId,
  sideType,
}: {
  agencyId: string;
  sideType: "agency" | "subaccount";
}) {
  const path = usePathname();

  const route = sideType === "agency" ? "agency" : "subaccount";

  return (
    <Command className="h-full w-full ">
      <CommandInput className="" placeholder="Search" />
      <CommandList className="h-full ">
        <CommandEmpty>No options found.</CommandEmpty>
        <CommandGroup className="h-full">
          <CommandItem className="my-3 p-0">
            <Link
              href={`/${route}/${agencyId}/dashboard`}
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
              href={`/${route}/${agencyId}/launchpad`}
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
              href={`/${route}/${agencyId}/settings`}
              className={cn(
                "flex items-center w-full  p-2 rounded-md",
                path.includes("settings") && "bg-violet-800"
              )}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </CommandItem>

          {sideType === "agency" && (
            <>
              <CommandItem className="my-3 p-0">
                <Link
                  href={`/${route}/${agencyId}/billing`}
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
                  href={`/${route}/${agencyId}/subaccounts`}
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
                  href={`/${route}/${agencyId}/team`}
                  className={cn(
                    "flex items-center w-full  p-2 rounded-md",
                    path.includes("team") && "bg-violet-800"
                  )}
                >
                  <StackIcon className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </Link>
              </CommandItem>
            </>
          )}

          {sideType === "subaccount" && (
            <>
              <CommandItem className="my-3 p-0">
                <Link
                  href={`/${route}/${agencyId}/automations`}
                  className={cn(
                    "flex items-center w-full text-white  p-2 rounded-md",
                    path.includes("automation") && "bg-violet-800"
                  )}
                >
                  <CircuitBoard className="mr-2 h-4 w-4" />
                  <span>Automations</span>
                </Link>
              </CommandItem>

              <CommandItem className="my-3 p-0">
                <Link
                  href={`/${route}/${agencyId}/media`}
                  className={cn(
                    "flex items-center w-full text-white  p-2 rounded-md",
                    path.includes("media") && "bg-violet-800"
                  )}
                >
                  <MdOutlinePayment className="mr-2 h-4 w-4" />
                  <span>Media</span>
                </Link>
              </CommandItem>

              <CommandItem className="my-3 p-0">
                <Link
                  href={`/${route}/${agencyId}/contacts`}
                  className={cn(
                    "flex items-center w-full text-white  p-2 rounded-md",
                    path.includes("contacts") && "bg-violet-800"
                  )}
                >
                  <MdOutlinePayment className="mr-2 h-4 w-4" />
                  <span>Contacts</span>
                </Link>
              </CommandItem>

              <CommandItem className="my-3 p-0">
                <Link
                  href={`/${route}/${agencyId}/pipelines`}
                  className={cn(
                    "flex items-center w-full text-white  p-2 rounded-md",
                    path.includes("pipelines") && "bg-violet-800"
                  )}
                >
                  <MdOutlinePayment className="mr-2 h-4 w-4" />
                  <span>Pipelines</span>
                </Link>
              </CommandItem>

              <CommandItem className="my-3 p-0">
                <Link
                  href={`/${route}/${agencyId}/funnels`}
                  className={cn(
                    "flex items-center w-full text-white  p-2 rounded-md",
                    path.includes("funnels") && "bg-violet-800"
                  )}
                >
                  <MdOutlinePayment className="mr-2 h-4 w-4" />
                  <span>Funnels</span>
                </Link>
              </CommandItem>
            </>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
