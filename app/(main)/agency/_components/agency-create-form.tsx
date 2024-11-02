"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import FileUpload from "@/components/global/file-upload";
import { createAgencyFormSchema } from "@/schemas/agency-schema";
import { createAgency } from "@/actions/agency/create-agency";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { computeSHA256, uploadAgencyLogo } from "@/lib/s3";
import { updateAgencyLogo } from "@/actions/agency/update-agent";

const handleUploadImage = async (file: File, agencyId: string) => {
  try {
    // const url = URL.createObjectURL(file);

    // get signed url
    const checksum = await computeSHA256(file);
    const signedURLResult = await uploadAgencyLogo({
      agencyId,
      checksum,
    });

    if (signedURLResult?.error) {
      toast.error(signedURLResult.error);
      return;
    }

    if (signedURLResult?.url) {
      // get image
      const response = await fetch(signedURLResult?.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!response.ok) {
        toast.error("Failed to upload image");
        return;
      }
      return signedURLResult.url.split("?")[0];
      // toast.success("File uploaded successfully");
    } else {
      toast.error("Something went wrong");
      return;
    }
  } catch (error) {
    console.log({ error });
    toast.error("Something went wrong");
  }
};

const AgencyCreateForm = () => {
  const [createLoading, setcreateLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof createAgencyFormSchema>>({
    resolver: zodResolver(createAgencyFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof createAgencyFormSchema>) => {
    setcreateLoading(true);

    try {
      console.log("Creating Agency");
      // TODO:: Store logo first
      const newAgency = await createAgency({ ...values, agencyLogo: "" });
      if (!newAgency) {
        toast.error("Something went wrong while creating new agenecy");
        return;
      }
      const imageUrl = await handleUploadImage(values.agencyLogo, newAgency.id);

      // update the subaccount to this logo
      await updateAgencyLogo({
        agencyId: newAgency.id,
        logo: imageUrl,
      });

      toast.success("Agency created successfully");
      router.push(`/agency/${newAgency.id}`);
    } catch (err) {
      console.log({ err });
      if (err) {
        toast.error("" + err);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setcreateLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto h-full p-5 rounded-lg border flex flex-col space-y-3"
      >
        <h1 className="text-3xl font-bold">Create An Agency</h1>
        <div className="flex flex-col">
          <h3 className="text-semibold text-xl">Agency Information</h3>
          <p className="text-sm text-slate-400">
            Lets create an agency for our business. You can edit agency settings
            later from the agency settings tab.
          </p>
        </div>
        <div className="flex flex-col gap-y-2 gap-4 border rounded-lg p-3 bg-muted/10">
          {/** Agency Logo */}

          <FormField
            control={form.control}
            name="agencyLogo"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="">
                <FormLabel>Agency Logo</FormLabel>
                <FormControl>
                  <FileUpload
                    onChange={onChange}
                    value={value}
                    fieldProps={fieldProps}
                    // fieldProps={fieldProps}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="phoneNumber"
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
            name="address"
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
        {createLoading ? (
          <Button disabled>
            <Loader className="animate-spin mr-2 w-4 h-4" />
            Loading
          </Button>
        ) : (
          <Button disabled={createLoading} className="mt-2" type="submit">
            Create Agency
          </Button>
        )}
      </form>
    </Form>
  );
};

export default AgencyCreateForm;
