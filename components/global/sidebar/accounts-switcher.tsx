"use client";
import React, { useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon, CompassIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useAgencySubaccounts } from "@/hooks/use-agency-subaccounts";
import { useCurrentAgency } from "@/hooks/use-agency";
import CreateSubAccountModal from "@/components/modals/create-subaccount-modal";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentSelectedAgencyOrSubaccount } from "@/hooks/use-selected-agency";

const AccountSwitcher = ({ agencyId }: { agencyId: string }) => {
  const { data: subaccounts, isLoading } = useAgencySubaccounts({ agencyId });
  const { data: agencyDetails, isLoading: loadingAgency } = useCurrentAgency();
  const userRole = useCurrentRole();
  const disableCreateSubaccount =
    userRole == "SUBACCOUNT_GUEST" || userRole == "SUBACCOUNT_USER";

  const { setCurrentAgencyId } = useCurrentSelectedAgencyOrSubaccount();

  useEffect(() => {
    setCurrentAgencyId(agencyId);
  }, [agencyId]);

  // tODO: handle switching proces

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="w-full mt-5 py-7 rounded-lg border-none bg-muted/50"
      >
        {/** Current Account  */}
        <Button variant="outline" className="p-3 py-7">
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
        <Command className=" shadow-md p-3 border rounded-lg w-[325px] bg-muted/30">
          <CommandInput placeholder="Search Accounts.." />
          <CommandList>
            {!loadingAgency && <CommandEmpty>No data found.</CommandEmpty>}

            {/** Main Agency Info  >> Show this only in case of owner or admin*/}

            {!agencyDetails && loadingAgency && (
              <div>
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            )}
            {agencyDetails && (
              <CommandGroup heading="Agency">
                <CommandItem className="flex items-center justify-start space-x-5 bg-muted/30 my-1 rounded-lg border">
                  {/* <AspectRatio ratio={20 / 10} className="bg-muted"> */}
                  <Image
                    src={agencyDetails?.agencyLogo || "/logo2.png"}
                    alt="Photo by Drew Beamer"
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  {/* </AspectRatio> */}

                  <div className="flex flex-col gap-1">
                    <p className="font-bold">{agencyDetails?.agencyName}</p>
                    <p className="text-muted-foreground text-sm">{`${agencyDetails?.zipcode} ${agencyDetails?.address}`}</p>
                  </div>
                </CommandItem>
              </CommandGroup>
            )}

            {/** All Subaccounts */}
            {isLoading && (
              <div>
                <Skeleton className="h-16 w-full mt-4" />
              </div>
            )}

            {!subaccounts || subaccounts?.length == 0 ? (
              <div className=" text-xs flex-col flex  text-slate-500">
                <div className="text-left p-1">Subaccounts</div>
                <p className="p-9 text-center border  rounded-md">
                  You dont have any Subaccounts
                </p>
              </div>
            ) : (
              <CommandGroup heading="Subaccounts" className="mt-4">
                {subaccounts?.map((subaccount) => (
                  <CommandItem className="flex items-center justify-start space-x-5  my-3 rounded-lg border">
                    <Image
                      src={subaccount?.subAccountLogo || "/logo2.png"}
                      alt="Subaccount Logoo"
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold">{subaccount.name}</p>
                      <p className="text-muted-foreground text-sm">{`${subaccount.zipCode} ${subaccount.address}`}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
          <div className="p-2 w-full ">
            <CreateSubAccountModal
              disabled={disableCreateSubaccount}
              agencyId={agencyId}
            >
              <Button
                disabled={disableCreateSubaccount}
                className="flex items-center justify-center mt-3 w-full border"
              >
                <div className="flex items-center justify-center space-x-2">
                  <PlusCircle className="w-4 h-4" />
                  <p className="text-md">Create Sub Account</p>
                </div>
              </Button>
            </CreateSubAccountModal>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AccountSwitcher;
