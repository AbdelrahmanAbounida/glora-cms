"use client";
import Image from "next/image";
import React from "react";
import { FileIcon, Cross1Icon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const FileUpload = ({
  onChange,
  value,
  fieldProps,
}: {
  onChange: any;
  value?: File;
  fieldProps: any;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <>
      <div className="w-full bg-muted/30 hover:bg-muted/40 dark:bg-slate-950 rounded-lg">
        <div className="w-full bg-muted/30 hover:bg-muted/40 rounded-lg">
          <div
            className="relative mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center h-full hover:cursor-pointer ut-uploading:ut-button:bg-slate-500 ut-label:text-slate-500 ut-label:font-normal ut-button:bg-violet-600/70 ut-button:hover:cursor-pointer"
            role="presentation"
            data-state="ready"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="mx-auto block h-12 w-12 align-middle text-gray-400"
              data-ut-element="upload-icon"
              data-state="ready"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765a4.5 4.5 0 0 1 8.302-3.046a3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <label
              className="mt-4 flex w-full h-full cursor-pointer items-center justify-center text-sm font-semibold leading-6 focus-within:outline-none hover:text-indigo-500 text-indigo-600"
              data-ut-element="label"
              data-state="ready"
            >
              Choose files or drag and drop
              <Input
                {...fieldProps}
                onChange={handleChange}
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                type="file"
                accept="image/*,application/pdf" // Allow PDFs as well
              />
            </label>
            <div
              className="m-0 h-[1.25rem] text-xs leading-5 text-gray-600"
              data-ut-element="allowed-content"
              data-state="ready"
            >
              Image (8MB)
            </div>
          </div>
        </div>
      </div>
      {value && <LogoView file={value} onChange={onChange} />}
    </>
  );
};

export default FileUpload;

const LogoView = ({ file, onChange }: { file?: File; onChange: any }) => {
  const type = file?.name?.split(".").pop();
  const isImage = type !== "pdf";

  const fileURL = file ? URL.createObjectURL(file) : "";

  return (
    <div className="flex gap-2 justify-center items-center mt-2">
      {isImage ? (
        <div className="relative w-full border h-10 pt-2 mt-3 rounded-md  pl-1 items-center justify-center">
          {/* <Image
            src={fileURL}
            alt="logo"
            className="object-contain "
            height={10}
            width={100}
          /> */}
          {file?.name}
        </div>
      ) : (
        <div className="flex space-x-3 items-center relative p-2 mt-2 rounded-md bg-background/10 ">
          <FileIcon className="w-4 h-4" />
          <a
            href={fileURL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            {file?.name}
          </a>
        </div>
      )}
      <Button
        onClick={() => onChange(null)} // Use null to clear the file
        className="flex space-x-2 gap-x-3 mt-3"
        variant={"outline"}
        type="button"
      >
        <CrossCircledIcon className="w-4 h-4 text-red-500" />
        Remove Logo
      </Button>
    </div>
  );
};
