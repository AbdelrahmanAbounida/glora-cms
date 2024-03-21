"use client";
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
import { Button } from "../../ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export function PopOverAccountsList() {
  return (
    <Command className=" shadow-md p-3 border rounded-lg w-[325px] bg-muted/30">
      <CommandInput placeholder="Search Account.." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Accounts">
          <CommandItem className="flex items-center justify-start space-x-5 bg-muted/30 my-3 rounded-lg border">
            {/* <AspectRatio ratio={20 / 10} className="bg-muted"> */}
            <Image
              src="/assets/logo.png"
              alt="Photo by Drew Beamer"
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
            {/* </AspectRatio> */}

            <div className="flex flex-col gap-1">
              <p className="font-bold">Bold Shift</p>
              <p className="text-muted-foreground text-sm">1234 street</p>
            </div>
          </CommandItem>
        </CommandGroup>
        {/* <CommandSeparator /> */}

        <CommandGroup heading="Subaccounts">
          <CommandItem className="flex items-center justify-start space-x-5  my-3 rounded-lg border">
            {/* <AspectRatio ratio={20 / 10} className="bg-muted"> */}
            <Image
              src="/assets/logo.png"
              alt="Photo by Drew Beamer"
              width={40}
              height={40}
              className="rounded-md object-cover"
            />
            {/* </AspectRatio> */}

            <div className="flex flex-col gap-1">
              <p className="font-bold">Test Shift</p>
              <p className="text-muted-foreground text-sm">1234 street</p>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="p-2">
        <Button className="flex items-center justify-center mt-3 w-full">
          <div className="flex items-center justify-center space-x-2">
            <PlusCircle className="w-4 h-4" />
            <p className="text-md">Create Sub Account</p>
          </div>
        </Button>
      </div>
    </Command>
  );
}
