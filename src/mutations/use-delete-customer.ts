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

async function deleteCustomer(
  access_token: string | undefined,
  customer_id: string,
): Promise<Customer> {
  const url = new URL(`/admin/customers-v2/${customer_id}`, BACKEND_URL);

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.customer;
}

interface UseDeleteCustomerParams {
  customer_id: string;
}

export function useDeleteCustomer(): UseMutationResult<
  Customer,
  HTTPError,
  UseDeleteCustomerParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ customer_id }: UseDeleteCustomerParams) => {
      return deleteCustomer(user?.access_token, customer_id);
    },
    mutationKey: [MUTATION_KEY.delete_customer],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_customers] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Customer deleted successfully");
    },
  });
}
