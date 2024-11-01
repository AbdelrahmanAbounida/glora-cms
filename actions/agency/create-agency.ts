"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createAgencyFormSchema } from "@/schemas/agency-schema";
import { z } from "zod";

type createAgencyFormSchemaType = z.infer<typeof createAgencyFormSchema>;

export const createAgency = async (props: createAgencyFormSchemaType) => {
  const session = await auth();
  console.log({ user: session?.user });
  if (!session || !session?.user) {
    throw new Error("You are not Authorized");
  }

  const zipcode = parseInt(props.zipcode);
  // create agency
  const newAgency = await db.agency.create({
    data: {
      ...props,
      zipcode,
    },
  });

  // update user agencyId with the role
  await db.user.update({
    where: {
      email: session?.user?.email!,
    },
    data: {
      agencyId: newAgency?.id,
      role: "AGENCY_OWNER",
    },
  });

  return newAgency;
};
