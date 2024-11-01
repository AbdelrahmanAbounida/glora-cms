"use server";

import { db } from "@/lib/db";

export const getSubaccounts = async ({ agencyId }: { agencyId: string }) => {
  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId,
    },
  });

  return subaccounts;
};
