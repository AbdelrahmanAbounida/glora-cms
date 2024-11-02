"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const updateAgencyLogo = async ({
  agencyId,
  logo,
}: {
  agencyId: string;
  logo?: string;
}) => {
  if (!logo) {
    return;
  }
  console.log("Update Logo");
  const session = await auth();
  if (!session || !session?.user) {
    throw new Error("You are not Authorized");
  }
  // update subaccount
  const updatedAgency = await db.agency.update({
    where: {
      id: agencyId,
    },
    data: {
      agencyLogo: logo,
    },
  });

  return updatedAgency;
};
