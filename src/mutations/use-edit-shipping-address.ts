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
import { AddShippingAddressRequest } from "./use-add-shipping-address";

async function editShippingAddress(
  access_token: string | undefined,
  customer_id: string,
  shipping_address_id: string,
  shipping_address: AddShippingAddressRequest,
): Promise<Customer> {
  const url = new URL(
    `/admin/customers-v2/${customer_id}/shipping_addresses/${shipping_address_id}`,
    BACKEND_URL,
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(shipping_address),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.customer;
}

interface UseEditShippingAddressParams {
  customer_id: string;
  shipping_address_id: string;
  shipping_address: AddShippingAddressRequest;
}

export function useEditShippingAddress(): UseMutationResult<
  Customer,
  HTTPError,
  UseEditShippingAddressParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      customer_id,
      shipping_address_id,
      shipping_address,
    }: UseEditShippingAddressParams) => {
      return editShippingAddress(
        user?.access_token,
        customer_id,
        shipping_address_id,
        shipping_address,
      );
    },
    mutationKey: [MUTATION_KEY.edit_customer_shipping_address],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.customer] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Shipping address added successfully");
    },
  });
}
