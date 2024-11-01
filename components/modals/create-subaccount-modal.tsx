"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { createSubaccountSchema } from "@/schemas/subaccount-schema";
import { z } from "zod";
import { createSubaccount } from "@/actions/subaccount/create-account";
import FileUpload from "../global/file-upload";
import { Loader } from "lucide-react";
import { uploadSubaccountLogo } from "@/lib/s3";

const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

type createSubaccountSchemaType = z.infer<typeof createSubaccountSchema>;

const handleUploadImage = async (file: File, subaccountId: string) => {
  try {
    // const url = URL.createObjectURL(file);

    // get signed url
    const checksum = await computeSHA256(file);
    const signedURLResult = await uploadSubaccountLogo({
      subaccountId,
      checksum,
    });

    if (signedURLResult?.error) {
      toast.error(signedURLResult.error);
      return;
    }

    if (signedURLResult?.url) {
      console.log(signedURLResult?.url);
      // get image
      await fetch(signedURLResult?.url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
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

const CreateSubAccountModal = ({
  children,
  agencyId,
  disabled = false,
}: {
  children?: React.ReactNode;
  agencyId: string;
  disabled?: boolean;
}) => {
  const [createLoading, setcreateLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  // form
  const form = useForm<createSubaccountSchemaType>({
    resolver: zodResolver(createSubaccountSchema),
    defaultValues: {},
  });
  const errors = form?.formState.errors;
  // submit
  const handleCreateSubaccount = async (data: createSubaccountSchemaType) => {
    try {
      setcreateLoading(true);

      // 1- create Board
      const newSubaccount = await createSubaccount(
        { ...data, subAccountLogo: "" },
        agencyId
      );

      // 2- upload logo to s3
      if (newSubaccount) {
        // 2- update its image in s3
        // const imageUrl = await handleUploadImage(data.imageFile, newSubaccount.id);  // TODO:: Handle upload image

        toast.success("Subaccount has been created successfully");
        router.push(`/subaccount/${newSubaccount?.id}/dashboard`);
      } else {
        // 3- handling errors
        toast.error("Something went wrong while creating new subaccount");
      }
      setcreateLoading(false);
    } catch (error) {
      console.log({ error });
    } finally {
      setcreateLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        form.clearErrors();
        // form.reset();
      }}
    >
      {" "}
      {/** setsubmitError({ title: false, file: false }) */}
      <DialogTrigger disabled={disabled} className="w-full">
        {children ? (
          children
        ) : (
          <Button
            variant={"default"}
            className="bg-sky-700 hover:bg-sky-600 text-white text-md w-[110px]"
          >
            Create
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className=" border overflow-auto max-h-[95%]">
        <DialogHeader>
          <DialogTitle
            className={`w-full flex text-center items-center justify-center ${
              theme == "dark" ? "text-zinc-100" : "text-zinc-800"
            }`}
          >
            Create An Subaccount
          </DialogTitle>
          <DialogDescription className="text-center pt-1 text-xs ">
            Lets create an Subaccount for our business. You can edit Subaccount
            settings later from the Subaccount settings tab.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateSubaccount)}
            className="max-w-4xl mx-auto h-full  rounded-lg  flex flex-col space-y-3 "
          >
            <div className="flex flex-col gap-y-2 gap-4  rounded-lg p-3 bg-muted/10">
              {/** Subaccount Logo */}

              {/* <FormField
                control={form.control}
                name="subAccountLogo"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="flex flex-col items-start justify-start ">
                    <FormLabel
                      htmlFor="name"
                      className="text-left font-semibold pl-1 text-black"
                    >
                      Subaccount Logo
                    </FormLabel>

                    <FormControl>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        {...fieldProps}
                        onChange={(event) =>
                          onChange(event.target.files && event.target.files[0])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="subAccountLogo"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="">
                    <FormLabel>Subaccount Logo</FormLabel>
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

              {/** Subaccount  Name, Email */}
              <div className="flex w-full items-center gap-x-5 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Subaccount Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Subaccount Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/** Phone number */}
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Company Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Subaccount phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="Your Subaccount address" {...field} />
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
                  name="zipCode"
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
                Create Subaccount
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubAccountModal;
