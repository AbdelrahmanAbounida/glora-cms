"use client";
import * as React from "react";
import { compareAsc, format, formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import CardAction from "./card-action";

const MediaCard = ({ image, title }: { image: string; title: string }) => {
  return (
    <Card className="max-w-[350px] m-2">
      <CardContent className="w-full p-0 rounded-md">
        <AspectRatio ratio={16 / 9} className="rounded-md">
          <Image alt="test" fill src={image} className="rounded-md" />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between p-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col p-1 gap-2">
            <p className="text-sm text-gray-500">
              {format(new Date(2023, 6, 2), "EEE MMM dd yyyy HH:mm:ss")}
            </p>
            <p className="text-md">{title}</p>
          </div>

          <CardAction />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MediaCard;
