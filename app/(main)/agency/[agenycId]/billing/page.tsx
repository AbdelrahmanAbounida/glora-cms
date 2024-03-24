import BillingTable from "@/components/tables/billing/billing-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PricingPlanProps, PricingPlansDetails } from "@/constants/pricing";
import { formatPrice } from "@/lib/format";
import React from "react";

const Billing = () => {
  return (
    <div className="flex flex-col sapce-y-4 w-full p-2">
      <h2 className="text-sm">Subscription Helper</h2>

      <div className="flex flex-col p-3 mt-2">
        <h1 className="text-4xl">Billing</h1>
        <Separator className="my-3" />

        {/** Plans */}
        <h2 className="text-2xl my-3">CurrentPlane</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2  mt-3 sapce-x-3 gap-4 ">
          {PricingPlansDetails.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col p-2 border rounded-lg bg-slate-900/10"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-col p-3 w-full">
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex flex-col  w-full">
                      <p className="text-xl font-bold">{plan.name}</p>
                      <p className="text-sm text-gray-500">
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex">
                      <p className="text-3xl font-bold">
                        {formatPrice(plan.price)}
                      </p>
                      <p className="text-sm text-gray-500 pt-5">/month</p>
                    </div>
                  </div>

                  <ul className="mt-5 list-disc p-5">
                    {plan.options.map((option, i) => (
                      <li className="text-gray-500  text-md" key={i}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3">
                <div className="w-full items-center justify-between flex p-2 border rounded-md">
                  <div className="flex flex-col p-2">
                    <p className="text-lg">{plan.subscriptionButton.header}</p>
                    <p className="text-gray-600  text-md">
                      {plan.subscriptionButton.description}
                    </p>
                  </div>

                  <Button className="">{plan.subscriptionButton.name}</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl mt-7">Payment History</h2>

        <BillingTable />
      </div>
    </div>
  );
};

export default Billing;
