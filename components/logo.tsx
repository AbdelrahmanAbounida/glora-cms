import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn(className)}>
      {/* <img className="" src="/logo.jpg" width={200} height={200} /> */}
      <p className="text-4xl leading-3 font-bold tracking-wide font-sans">
        <span className="text-indigo-500">G</span>
        LORA
      </p>
    </Link>
  );
};

export default Logo;
