"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const updateSubaccountLogo = async ({
  subaccountId,
  logo,
}: {
  subaccountId: string;
  logo?: string;
}) => {
  if (!logo) {
    return;
  }
  console.log("Update Logo");
  console.log({ subaccountId });
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not Authorized");
  }
  // update subaccount
  const updatedSubaccount = await db.subAccount.update({
    where: {
      id: subaccountId,
    },
    data: {
      subAccountLogo: logo,
    },
  });

  return updatedSubaccount;
};
