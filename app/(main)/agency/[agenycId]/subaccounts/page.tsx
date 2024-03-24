"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const Subaccounts = () => {
  const subaccounts = [
    {
      logo: "/assets/logo.png",
      address: "1244 street",
      name: "Bolt",
    },
    {
      logo: "/assets/logo2.jpg",
      address: "98698 street",
      name: "Company",
    },
  ];
  return (
    <div className="p-3 flex flex-col">
      <div className="w-full flex flex-col ">
        <div className="flex items-center justify-end">
          <Button className="max-w-xs flex space-x-2 flex-end">
            <PlusCircle className="h-4 w-4" />
            <p>Create Sub Account</p>
          </Button>
        </div>

        <div className="relative mt-5 ">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8 bg-muted-foreground/10" />
        </div>
        <div className="p-3 flex flex-col items-center justify-start w-full ">
          <p className="text-muted-foreground/60  w-full justify-start flex">
            Sub Accounts
          </p>
          <div className="flex flex-col w-full mt-5 space-y-7">
            {subaccounts.map((sub, index) => (
              <div
                key={index}
                className="flex p-3 bg-muted/30 items-center justify-between w-full rounded-lg"
              >
                <div className="w-full flex items-center justify-start ">
                  <Image
                    width={80}
                    height={50}
                    src={sub.logo}
                    alt="logo"
                    className="rounded-md object-cover mr-4"
                  />

                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">{sub.name}</h3>
                    <h4 className="text-muted-foreground">{sub.address}</h4>
                  </div>
                </div>

                <Button size={"lg"} variant={"destructive"}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subaccounts;
