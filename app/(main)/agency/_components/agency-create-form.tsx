"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  agencyLogo: z.string().min(1, { message: "Agency logo is reqiured" }),
  agencyName: z.string().min(2, { message: "Minimum agency name length is 2" }),
  agencyEmail: z
    .string()
    .min(1, { message: "Agency email is requierd" })
    .email("This is not a valid email"),
  agencyPhoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
  whiteLabel: z.boolean().default(false).optional(),
  adress: z.string().min(1, { message: "Adress is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipcode: z.number().min(1, { message: "Zipcode is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

const AgencyCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto h-full p-5 rounded-lg border flex flex-col space-y-5"
      >
        <h1 className="text-3xl font-bold">Create An Agency</h1>
        <div className="flex flex-col">
          <h3 className="text-semibold text-xl">Agency Information</h3>
          <p className="text-sm text-slate-400">
            Lets create an agency for our business. You can edit agency settings
            later from the agency settings tab.
          </p>
        </div>
        <div className="flex flex-col gap-y-5 gap-4 border rounded-lg p-3 bg-slate-800/20">
          {/** Agency  Name, Email */}
          <div className="flex w-full items-center gap-x-5 ">
            <FormField
              control={form.control}
              name="agencyName"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Agency Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your agency Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agencyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your agency Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/** Phone number */}
          <FormField
            control={form.control}
            name="agencyEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Agency Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your agency phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Whitelabel Agency */}
          <FormField
            control={form.control}
            name="whiteLabel"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between w-full rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5 ">
                  <FormLabel>Whitelabel Agency</FormLabel>
                  <FormDescription>
                    Turning on Whitelabel mode will show your agency logo to all
                    subaccounts by default. You can overwrite thie functionaliy
                    through sub account settings
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/** Address */}
          <FormField
            control={form.control}
            name="adress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Adress</FormLabel>
                <FormControl>
                  <Input placeholder="Your agency address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** city, status, zipcode */}

          <div className="w-full flex gap-x-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input placeholder="zipcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="mt-2" type="submit">
          Create Agency
        </Button>
      </form>
    </Form>
  );
};

export default AgencyCreateForm;
