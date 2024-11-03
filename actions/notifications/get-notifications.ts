"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getAllNotifications = async ({
  subAccountId,
}: {
  subAccountId?: string;
}) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You are not auhtorized");
  }

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email!,
    },
  });
  let notifications = [];

  if (
    user?.role == "SUBACCOUNT_GUEST" ||
    (user?.role == "SUBACCOUNT_USER" && subAccountId)
  ) {
    notifications = await db.notification.findMany({
      where: {
        subAccountId,
      },
    });
  } else {
    notifications = await db.notification.findMany({
      where: {
        agencyId: user?.agencyId!,
      },
    });
  }
  return notifications;
};
