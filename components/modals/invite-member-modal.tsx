"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { createSubaccountSchema } from "@/schemas/subaccount-schema";
import FileUpload from "../global/file-upload";
import { Loader } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InviteSchema } from "@/schemas/invite-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";

type inviteUserFormSchema = z.infer<typeof InviteSchema>;

const InviteMemberModal = ({
  children,
  disabled = false,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
}) => {
  const [createLoading, setcreateLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const userRole = useCurrentRole();

  // form
  const form = useForm<inviteUserFormSchema>({
    resolver: zodResolver(createSubaccountSchema),
    defaultValues: {},
  });
  // submit
  const handleCreateSubaccount = async (data: inviteUserFormSchema) => {
    try {
      setcreateLoading(true);
    } catch (error) {
      console.log({ error });
    } finally {
      setcreateLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        disabled={
          disabled ||
          userRole == "SUBACCOUNT_GUEST" ||
          userRole == "SUBACCOUNT_USER"
        }
        className="w-full"
      >
        {children ? (
          children
        ) : (
          <Button
            variant={"default"}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-md w-[110px]"
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
            Add a team member
          </DialogTitle>
          <DialogDescription className="text-center pt-1 text-xs ">
            An invitation will be sent the user. Users who already have an
            invitation sent out to their email.will not recieve anthor
            invitation.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateSubaccount)}
            className="max-w-4xl mx-auto h-full w-full  rounded-lg  flex flex-col space-y-3 "
          >
            <div className="flex flex-col gap-y-9 gap-4 w-full   rounded-lg p-3 bg-muted/10">
              {/** Email */}
              <div className="flex w-full items-center gap-9 ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input
                          className="flex-1 w-full"
                          placeholder="Your Company Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(UserRole).map((val, index) => (
                            <SelectItem key={index} value={val}>
                              {val}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {createLoading ? (
              <Button disabled>
                <Loader className="animate-spin mr-2 w-4 h-4" />
                Loading
              </Button>
            ) : (
              <Button disabled={createLoading} className="mt-2" type="submit">
                Send Invitation
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
