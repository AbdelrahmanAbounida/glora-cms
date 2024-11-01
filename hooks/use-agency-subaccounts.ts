import { getSubaccounts } from "@/actions/subaccount/get-subaccounts";
import useSWR from "swr";

export const fetcher = async ([key, agencyId]: [string, string]) => {
  try {
    const res = await getSubaccounts({ agencyId });
    if (!res) {
      throw new Error("Something went wrong while fetching subaccounts");
    }
    return res;
  } catch (error) {
    throw new Error("Something went wrong while fetching subaccounts");
  }
};

export const useAgencySubaccounts = ({ agencyId }: { agencyId: string }) => {
  const { data, isLoading, error } = useSWR(
    ["getUserHistory", agencyId],
    fetcher
  );
  return { data, isLoading, error };
};
