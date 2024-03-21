"use client";
import Image from "next/image";
import React from "react";
import { FileIcon, Cross1Icon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";

const FileUpload = ({
  endpoint,
  onChange,
  value,
}: {
  endpoint: "agencyLogo" | "subaccountLogo" | "avatar";
  onChange: any;
  value?: string;
}) => {
  const type = value?.split(".").pop();
  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== "pdf" ? (
          <div className="relative w-full border h-40">
            <Image src={value} alt="logo" className="object-cover" fill />
          </div>
        ) : (
          <div className="flex space-x-3 items-center relative p-2 mt-2 rounded-md bg-background/10 ">
            <FileIcon className="w-4 h-4" />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-indigo-500 dark:text-indigo-400 hover:underline"
            />
          </div>
        )}

        {/** TODO:: Handle removing logo */}
        <Button
          onClick={() => onChange("")}
          className="flex space-x-2 gap-x-3 mt-3"
          variant={"outline"}
          type="button"
        >
          <CrossCircledIcon className="w-4 h-4" />
          Remove Logo
        </Button>
      </div>
    );
  }

  return (
    <div className=" w-full bg-muted/30 hover:bg-muted/40 rounded-lg">
      <UploadDropzone
        className="h-full hover:cursor-pointer ut-uploading:ut-button:bg-slate-500  ut-label:text-slate-500 ut-label:font-normal ut-button:bg-violet-600/70 ut-button:hover:cursor-pointer"
        endpoint={endpoint}
        onUploadError={(error) => console.log({ error })}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
      />
    </div>
  );
};

export default FileUpload;
