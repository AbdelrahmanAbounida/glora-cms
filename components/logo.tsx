import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className={cn(className)}>
      <img className="" src="/logo.jpg" width={200} height={200} />
    </Link>
  );
};

export default Logo;
