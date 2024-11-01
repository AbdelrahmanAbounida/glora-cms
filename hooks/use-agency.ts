import { getAgencyDetails } from "@/actions/agency/get-ageny-details";
import useSWR from "swr";

const fetcher = async ([key]: [string]) => {
  const res = await getAgencyDetails();
  return res;
};

export const useCurrentAgency = () => {
  const { data, isLoading, error } = useSWR(["useCurrentAgency"], fetcher);
  return { data, isLoading, error };
};
