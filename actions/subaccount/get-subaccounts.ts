"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getUserSubaccounts = async ({
  agencyId,
}: {
  agencyId: string;
}) => {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("You are not unAuthorized to do this action");
  }

  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId,
    },
  });

  // filter subaccount according to current user
  const permissions = await db.permission.findMany({
    where: {
      userEmail: session.user.email,
      hasAccess: true,
    },
  });

  const subaccountIds = permissions.map(
    (permission) => permission.subaccountId
  );

  const filteredSubaccounts = subaccounts.filter((subaccount) =>
    subaccountIds.includes(subaccount.id)
  );

  return filteredSubaccounts;
};
