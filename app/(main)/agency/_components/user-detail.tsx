"use client";
import FileUpload from "@/components/global/file-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserSchema } from "@/schemas/user-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const UserDetail = () => {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof updateUserSchema>) => {
    console.log({ values });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/2 h-full p-5 rounded-lg border flex flex-col space-y-9"
      >
        {/** User Logo */}

        <div className="flex flex-col">
          <h3 className="text-semibold text-2xl">User Information</h3>
          <p className="text-sm text-slate-400">
            Update your profile information
          </p>
        </div>
        <div className="flex flex-col gap-y-9 gap-4 border rounded-lg p-5 bg-muted/30">
          <FormField
            control={form.control}
            name="userLogo"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="">
                <FormLabel>Profile Logo</FormLabel>
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
          <FormField
            control={form.control}
            name="userFullname"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Phone number */}
          <FormField
            control={form.control}
            name="userRole"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>User Role</FormLabel>
                <FormControl>
                  <Input placeholder="Your agency phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button>Save User Details</Button>
      </form>
    </Form>
  );
};

export default UserDetail;
