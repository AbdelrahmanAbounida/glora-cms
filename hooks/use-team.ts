import { getTeamMembers } from "@/actions/team/get-team-members";
import useSWR from "swr";

const fetcher = async ([key]: [string]) => {
  const res = await getTeamMembers();
  return res;
};

export const useTeamMembers = () => {
  const { data, isLoading, error } = useSWR(["useTeamMembers"], fetcher);
  return { data, isLoading, error };
};
