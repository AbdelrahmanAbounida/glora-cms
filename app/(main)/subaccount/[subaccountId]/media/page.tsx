import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import MediaCard from "../../_components/media-card";

const SubaccountMedia = () => {
  const images = [
    "BannerImage",
    "Banner V2",
    "Test Image",
    "Marketing",
    "IPad",
    "Beach",
    "Apple",
    "Green Gradient",
    "Tests",
  ];
  return (
    <div className="flex flex-col p-4">
      <div className="flex w-full items-center justify-between p-3">
        <h1 className="text-2xl font-medium">Media Bucket</h1>
        <Button>Upload</Button>
      </div>

      <div className="relative flex w-full mt-4">
        <Input
          className="pl-8 bg-muted/40"
          placeholder="Search for filename..."
        />
        <Search className="text-slate-600 w-4 h-4 absolute inset-y-0 left-3 top-3" />
      </div>
      <h3 className="text-md text-muted/30">Media Files</h3>

      {/** images */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 3xl:grid-cols-5 gap-2 transition-all">
        {/** Image Card */}
        {images.map((img, index) => (
          <MediaCard
            title={img}
            key={index}
            image={`/assets/media/test${index + 1}.jpg`}
          />
        ))}
      </div>
    </div>
  );
};

export default SubaccountMedia;
