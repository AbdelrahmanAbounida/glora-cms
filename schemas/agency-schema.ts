import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const createAgencyFormSchema = z.object({
  agencyLogo: z.any().refine((val) => !!val, "Agency Logo is required"),
  agencyName: z.string().min(2, { message: "Minimum agency name length is 2" }),
  agencyEmail: z
    .string()
    .min(1, { message: "Agency email is requierd" })
    .email("This is not a valid email"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
  whiteLabel: z.boolean().default(false).optional(),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipcode: z
    .string()
    .min(1, { message: "Zipcode is required" })
    .refine((n) => !isNaN(parseInt(n)), "Unvalid zipcode"),
  country: z.string().min(1, { message: "Country is required" }),
});

export const updateAgencyFormSchema = createAgencyFormSchema.extend({});
