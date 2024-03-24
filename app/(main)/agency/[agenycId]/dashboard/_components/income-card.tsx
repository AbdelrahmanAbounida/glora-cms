import { DollarSignIcon } from "lucide-react";
import React from "react";

const IncomeCard = () => {
  return (
    <div className="flex rounded-lg border shadow-md bg-accent/20 p-4 relative h-[210px] ">
      <div className="absolute inset-y-0 top-3 right-3">
        <DollarSignIcon className="w-6 h-6" />
      </div>

      <div className="flex flex-col mt-3 ">
        <h3 className="text-lg text-muted-foreground ">Income</h3>
        <h1 className="mt-2 text-3xl font-medium">USD 123.32</h1>
        <h3 className="text-muted-foreground text-md">for the year 2023</h3>

        <h4 className="text-md text-muted-foreground/60 mt-5">
          total revenue generated as reflected in your stripe account
        </h4>
      </div>
    </div>
  );
};

export default IncomeCard;
