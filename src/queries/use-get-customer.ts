import { Customer } from "@medusajs/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

async function getCustomerById(
  access_token: string,
  id: string,
): Promise<Customer> {
  const url = new URL(
    `/admin/customers/${id}?expand=shipping_addresses`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.customer;
}

export function useGetCustomer(
  customer_id: string,
): UseQueryResult<Customer, HTTPError> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.customer, user?.access_token, customer_id],
    queryFn: async ({ queryKey }): Promise<Customer> =>
      getCustomerById(queryKey[1] as string, queryKey[2] as string),
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
