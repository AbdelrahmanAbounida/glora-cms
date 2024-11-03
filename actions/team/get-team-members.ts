"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getTeamMembers = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You are not auhtorized");
  }

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });

  const members = await db.user.findMany({
    where: {
      agencyId: user?.agencyId,
    },
    include: {
      agency: {
        select: {
          agencyName: true, // incase user is admin
        },
      },
      permission: {
        select: {
          subAccount: {
            select: {
              name: true, // incase user is guest/ subaccount
            },
          },
        },
      },
    },
  });

  return members;
};
