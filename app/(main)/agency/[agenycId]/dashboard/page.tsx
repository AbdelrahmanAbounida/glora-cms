import { DollarSignIcon } from "lucide-react";
import React from "react";
import IncomeCard from "./_components/income-card";
import PotentialCard from "./_components/potential-card";
import ActiveCard from "./_components/active-card";
import GoalCard from "./_components/goal-card";
import Transactionhistory from "./_components/transaction-history-chart";

const Dashboard = () => {
  return (
    <div className="flex flex-col p-3">
      <h1 className="text-2xl font-medium">Dashbaord</h1>

      <div className="mt-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 items-center gap-3">
          {/** Income Card */}
          <IncomeCard />
          <PotentialCard />
          <ActiveCard />
          <GoalCard />
        </div>
        <div className="mt-10 p-5 flex flex-col gap-5 border h-[430px]">
          <h1 className="text-3xl font-medium flex p-3">Transcation History</h1>
          <Transactionhistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
