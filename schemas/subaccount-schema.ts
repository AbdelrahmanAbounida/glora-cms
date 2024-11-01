import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const createSubaccountSchema = z.object({
  subAccountLogo: z.any().refine((val) => !!val, "Subaccount Logo is required"),
  name: z.string().min(2, { message: "Minimum Subaccount name length is 2" }),
  companyEmail: z
    .string()
    .min(1, { message: "Subaccount email is requierd" })
    .email("This is not a valid email"),
  companyPhone: z.string().regex(phoneRegex, "Invalid phone number"),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z
    .string()
    .min(1, { message: "Zipcode is required" })
    .refine((n) => !isNaN(parseInt(n)), "Unvalid zipcode"),
  country: z.string().min(1, { message: "Country is required" }),
});

export const updateSubaccountSchema = createSubaccountSchema.extend({});
