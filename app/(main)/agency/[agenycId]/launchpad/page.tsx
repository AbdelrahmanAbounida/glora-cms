import React from "react";
import { FcAndroidOs } from "react-icons/fc";
import { ImAppleinc } from "react-icons/im";
import { FaApple, FaStripe } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const Launchpad = () => {
  return (
    <div className="w-full h-full ">
      <div className="w-full p-5 rounded-lg bg-muted/10">
        <h1 className="text-lg font-medium">Lets get Started!</h1>
        <h3 className="text-muted-foreground/70">
          follow the steps below to get your account setup
        </h3>

        <div className="p-3 flex flex-col">
          <div className="rounded-lg border flex items-center justify-between my-5">
            <div className="flex w-full items-center justify-between px-4">
              <div className="flex items-center gap-2 p-5">
                <FcAndroidOs className="w-12 h-12 bg-gray-600 rounded-full" />
                <FaApple className="w-12 h-12 bg-gray-600 rounded-full p-1" />
                Save the website as a shortcut on your mobile device
              </div>

              <Button size={"lg"}>Start</Button>
            </div>
          </div>

          <div className="rounded-lg border flex items-center justify-between my-5">
            <div className="flex w-full items-center justify-between px-4">
              <div className="flex items-center gap-2 p-5">
                <FaStripe className="w-12 h-12 rounded-full text-violet-800" />
                Connect Your stripe account to accept payments
              </div>

              <Button size={"lg"}>Start</Button>
            </div>
          </div>

          <div className="rounded-lg border flex items-center justify-between my-5">
            <div className="flex w-full items-center justify-between px-4">
              <div className="flex items-center gap-2 p-5">
                <Image
                  width={55}
                  height={50}
                  src={"/assets/logo.png"}
                  alt="logo"
                  className="rounded-md object-cover mr-4"
                />
                Fill in all your business details
              </div>

              <CheckCircle className="text-violet-600 w-12 h-12 mr-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launchpad;
