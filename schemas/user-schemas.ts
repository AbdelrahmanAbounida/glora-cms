import { UserRole } from "@prisma/client";
import { z } from "zod";

export const updateUserSchema = z.object({
  userFullname: z.string().min(1, { message: "User Fullname is required" }),
  userLogo: z.any().refine((val) => !!val, "User Logo is required"),
  email: z.string().min(1, { message: "Email is required" }),
  userRole: z.enum(["", ...Object.values(UserRole)]),
});
