import { CustomerDTO } from "@medusajs/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

interface ListCustomersResponse {
  customers: CustomerDTO[];
  count: number;
  offset: number;
  limit: number;
}

async function listCustomers(
  access_token: string,
): Promise<ListCustomersResponse> {
  const url = new URL(
    `/admin/customers?expand=shipping_addresses`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

export function useListCustomers(): UseQueryResult<
  ListCustomersResponse,
  HTTPError
> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.customers, user?.access_token],
    queryFn: async ({ queryKey }): Promise<ListCustomersResponse | null> =>
      listCustomers(queryKey[1] as string),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    throwOnError: (error) => {
      console.error(error);
      toast.error(error.message);
      return false;
    },
  });
}
