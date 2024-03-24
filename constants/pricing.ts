interface pricingPlanButtonProps {
  name: string;
  header: string;
  description: string;
}

export interface PricingPlanProps {
  name: string;
  description: string;
  price: number;
  options: string[];
  subscriptionButton: pricingPlanButtonProps;
}

export const PricingPlansDetails: PricingPlanProps[] = [
  {
    name: "Starter",
    description: "Lets get started! Pick a plan that works best for you.",
    price: 0,
    options: ["3 SubAccounts", "2 Team Members", "Unlimited Pipelines"],
    subscriptionButton: {
      name: "Get Started",
      header: "Plan Options",
      description:
        "Want to modify your plan? You can do this here.If you have further question contact support@glora-app.com",
    },
  },
  {
    name: "24/7 Priority Support",
    description: "Dedicated support line & teams channel for support",
    price: 350,
    options: [
      "10 SubAccounts",
      "unlimited Team Members",
      "Unlimited Pipelines",
    ],
    subscriptionButton: {
      name: "Subscripe",
      header: "Get support now!",
      description:
        "Get priority support and skip the long term with the click of a button for  more options",
    },
  },
];
