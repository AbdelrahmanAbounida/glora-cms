import { UserRole } from "@prisma/client";
import { z } from "zod";

const roles = Object.values(UserRole) as [UserRole, ...UserRole[]];

export const InviteSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  role: z.enum(roles),
});
