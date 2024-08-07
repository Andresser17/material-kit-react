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

export interface CustomerRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  document: string;
  mercado_libre: string;
  instagram: string;
  facebook: string;
  phone: string;
}

async function createCustomer(
  access_token: string | undefined,
  newCustomer: CustomerRequest,
): Promise<Customer> {
  const url = new URL("/admin/customers-v2", BACKEND_URL);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(newCustomer),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.customer;
}

interface UseAddProductParams {
  newCustomer: CustomerRequest;
}

export function useCreateCustomer(): UseMutationResult<
  Customer,
  HTTPError,
  UseAddProductParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ newCustomer }: UseAddProductParams) => {
      return createCustomer(user?.access_token, newCustomer);
    },
    mutationKey: [MUTATION_KEY.create_customer],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_customers] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Customer added successfully");
    },
  });
}
