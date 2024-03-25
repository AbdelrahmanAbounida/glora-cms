import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const SubaccountMedia = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex w-full items-center justify-between p-3">
        <h1 className="text-2xl font-medium">Media Bucket</h1>
        <Button>Upload</Button>
      </div>

      <div className="relative flex w-full">
        <Input className="" placeholder="Search for filename..." />
        <Search className="w-4 h-4 absolute inset-y-0 left-3 top-3" />
      </div>
    </div>
  );
};

export default SubaccountMedia;
