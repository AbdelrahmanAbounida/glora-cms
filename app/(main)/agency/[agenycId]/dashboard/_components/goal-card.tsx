import { Goal } from "lucide-react";
import React from "react";

const GoalCard = () => {
  return (
    <div className="flex rounded-lg border shadow-md bg-accent/20 p-4 relative h-[210px] ">
      <div className="absolute inset-y-0 top-3 right-3">
        <Goal className="w-6 h-6" />
      </div>

      <div className="flex flex-col mt-3 ">
        <h3 className="text-lg text-muted-foreground ">Agency Goal</h3>

        <h4 className="text-md text-muted-foreground/60 mt-5">
          Reflects the number of subaccounts you want to own and manage
        </h4>
      </div>
    </div>
  );
};

export default GoalCard;
