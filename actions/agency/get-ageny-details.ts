"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getAgencyDetails = async () => {
  // get current user
  const session = await auth();

  const user = await session?.user;

  if (!user) {
    throw new Error("unAuthorized");
  }

  // check user role
  if (user?.role == "SUBACCOUNT_GUEST" || user?.role == "SUBACCOUNT_USER") {
    return;
  }

  const dbUser = await db.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  // get agency details
  const agency = await db.agency.findFirst({
    where: {
      id: dbUser?.agencyId!,
    },
  });

  return agency;
};
