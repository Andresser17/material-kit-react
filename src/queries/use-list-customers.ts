import toast from "react-hot-toast";
import { CustomerDTO } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface GetCustomersResponse {
  customers: CustomerDTO[];
  count: number;
  offset: number;
  limit: number;
}

async function getCustomers(
  access_token: string,
): Promise<GetCustomersResponse> {
  const url = new URL(`/admin/customers-v2`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get customers");

  return await response.json();
}

export function useListCustomers(): GetCustomersResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.shipping_options, user?.access_token],
    queryFn: async ({ queryKey }): Promise<GetCustomersResponse | null> =>
      getCustomers(queryKey[1] as string),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    throwOnError: (error) => {
      console.error(error);
      toast.error(error.message);
      return false;
    },
  });

  useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: "pending" },
    // select: (mutation) => mutation.state.variables,
  });

  return {
    customers: data?.customers ? data.customers : [],
    count: data?.count ? data.count : 1,
    offset: data?.offset ? data.offset : 0,
    limit: data?.limit ? data.limit : 1,
  };
}
