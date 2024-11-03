import { getAllNotifications } from "@/actions/notifications/get-notifications";
import useSWR from "swr";

const fetcher = async ([key, subAccountId]: [string, string]) => {
  const res = await getAllNotifications({ subAccountId });
  return res;
};

export const useNotifications = ({
  subaccountId,
}: {
  subaccountId?: string;
}) => {
  if (!subaccountId) {
    return { data: [], isLoading: false, error: null };
  }
  const { data, isLoading, error } = useSWR(
    ["useNotifications", subaccountId],
    fetcher
  );
  return { data, isLoading, error };
};
