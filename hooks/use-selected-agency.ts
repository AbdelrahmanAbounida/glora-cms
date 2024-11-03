import { create } from "zustand";

type selectedAgencyOrSubaccount = {
  agencyId: string;
  subaccountId: string;
  setCurrentAgencyId: (newVal: string) => void;
  setCurrentSubaccountId: (newVal: string) => void;
};

export const useCurrentSelectedAgencyOrSubaccount =
  create<selectedAgencyOrSubaccount>((set) => ({
    agencyId: "",
    subaccountId: "",
    setCurrentAgencyId(newVal: string) {
      set({
        agencyId: newVal,
      });
    },

    setCurrentSubaccountId(newVal: string) {
      set({
        agencyId: newVal,
      });
    },
  }));
