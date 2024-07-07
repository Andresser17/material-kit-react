import { Customer } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";
import { CustomerRequest } from "./use-create-customer";

async function updateCustomer(
  access_token: string | undefined,
  customer_id: string,
  customer: CustomerRequest,
): Promise<Customer> {
  const url = new URL(`/admin/customers-v2/${customer_id}`, BACKEND_URL);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(customer),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.customer;
}

interface UseUpdateCustomerParams {
  customer_id: string;
  customer: CustomerRequest;
}

export function useUpdateCustomer(): UseMutationResult<
  Customer,
  HTTPError,
  UseUpdateCustomerParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ customer_id, customer }: UseUpdateCustomerParams) => {
      return updateCustomer(user?.access_token, customer_id, customer);
    },
    mutationKey: [MUTATION_KEY.update_customer],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.customer] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Customer edited successfully");
    },
  });
}
