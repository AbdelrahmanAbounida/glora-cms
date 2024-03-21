import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
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

export function SidebarMenuList() {
  return (
    <Command className=" shadow-md">
      <CommandInput className="" placeholder="Search." />
      <CommandList>
        <CommandEmpty>No options found.</CommandEmpty>
        <CommandGroup>
          <CommandItem className="my-3 p-0">
            <div className="flex items-center w-full bg-violet-600 p-2 rounded-md">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </div>

            {/* <SidebarOption
              option={{ href: "#", name: "Test", icon: CalendarIcon }}
            /> */}
          </CommandItem>
          <CommandItem className="my-3 p-0">
            <div className="flex items-center w-full  p-2 rounded-md">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>test</span>
            </div>
          </CommandItem>
          <CommandItem className="my-3 p-0">
            <div className="flex items-center w-full  p-2 rounded-md">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>asd</span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
