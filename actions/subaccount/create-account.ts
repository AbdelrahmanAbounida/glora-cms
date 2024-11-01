"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createSubaccountSchema } from "@/schemas/subaccount-schema";
import { z } from "zod";

type createSubaccountFormSchemaType = z.infer<typeof createSubaccountSchema>;

export const createSubaccount = async (
  props: createSubaccountFormSchemaType,
  agencyId: string
) => {
  const session = await auth();
  console.log({ agencyId });
  if (!session || !session?.user) {
    throw new Error("You are not Authorized");
  }

  // create subaccount
  const newSubaccount = await db.subAccount.create({
    data: {
      ...props,
      agencyId,
    },
  });

  return newSubaccount;
};
