import toast from "react-hot-toast";
import { CustomerDTO } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface GetCustomerByIdResponse {
  customer: CustomerDTO | null;
}

async function getCustomerById(
  access_token: string,
  id: string,
): Promise<GetCustomerByIdResponse> {
  const url = new URL(`/admin/customers-v2/${id}`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get customer by id", response);

  return await response.json();
}

export function useListCustomers(customer_id: string): GetCustomerByIdResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.shipping_options, user?.access_token, customer_id],
    queryFn: async ({ queryKey }): Promise<GetCustomerByIdResponse | null> =>
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

  useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: "pending" },
    // select: (mutation) => mutation.state.variables,
  });

  return {
    customer: data?.customer ? data.customer : null,
  };
}
