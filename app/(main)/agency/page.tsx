import React from "react";
import AgencyCreateForm from "./_components/agency-create-form";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Agency = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  // check if user has or joined in agency
  const user = await db.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });
  const userRole = user?.role;

  // user has agency
  if (user?.agencyId) {
    if (userRole == "AGENCY_ADMIN" || userRole == "AGENCY_OWNER") {
      return redirect(`/agency/${user?.agencyId}`);
    } else {
      return redirect("/subaccount");
    }
  }

  // user dont have agency
  return (
    <div className="w-full p-9 flex flex-col spay-y-5">
      <AgencyCreateForm />
    </div>
  );
};

export default Agency;
