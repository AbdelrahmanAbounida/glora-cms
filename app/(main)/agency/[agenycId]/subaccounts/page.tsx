"use client";
import CreateSubAccountModal from "@/components/modals/create-subaccount-modal";
import TableSkeleton from "@/components/tables/table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAgencySubaccounts } from "@/hooks/use-agency-subaccounts";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

const Subaccounts = (params: { agenycId: string }) => {
  // const subaccounts = [
  //   {
  //     logo: "/assets/logo.png",
  //     address: "1244 street",
  //     name: "Bolt",
  //   },
  //   {
  //     logo: "/assets/logo2.jpg",
  //     address: "98698 street",
  //     name: "Company",
  //   },
  // ];
  // const subaccounts: any[] = [];

  console.log(params.agenycId);

  const { data: subaccounts, isLoading } = useAgencySubaccounts({
    agencyId: params.agenycId,
  });

  if (isLoading) {
    return <TableSkeleton />;
  }
  return (
    <div className="p-3 flex flex-col">
      <div className="w-full flex flex-col ">
        <div className="flex items-center justify-end">
          <CreateSubAccountModal agencyId={params.agenycId}>
            <Button className="max-w-xs flex space-x-2 flex-end">
              <PlusCircle className="h-4 w-4" />
              <p>Create Sub Account</p>
            </Button>
          </CreateSubAccountModal>
        </div>

        <div className="relative mt-5 ">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8 bg-muted-foreground/10" />
        </div>

        {subaccounts?.length == 0 ? (
          <div className="flex w-full flex-col items-center gap-5 mt-5 border rouned-lg p-7">
            <p className="text-slate-400">
              You dont have any Subaccount. Start Creating new one
            </p>
            <CreateSubAccountModal agencyId={params.agenycId}>
              <Button className="max-w-xs flex space-x-2 flex-end">
                <PlusCircle className="h-4 w-4" />
                <p>Create Sub Account</p>
              </Button>
            </CreateSubAccountModal>
          </div>
        ) : (
          <div className="p-3 flex flex-col items-center justify-start w-full ">
            <p className="text-muted-foreground/60  w-full justify-start flex">
              Sub Accounts
            </p>
            <div className="flex flex-col w-full mt-5 space-y-7">
              {subaccounts?.map((sub, index) => (
                <div
                  key={index}
                  className="flex p-3 bg-muted/30 items-center justify-between w-full rounded-lg"
                >
                  <div className="w-full flex items-center justify-start ">
                    <Image
                      width={80}
                      height={50}
                      src={sub.subAccountLogo!}
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
        )}
      </div>
    </div>
  );
};

export default Subaccounts;
