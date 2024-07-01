import { CustomerDTO } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

export interface AddShippingAddressRequest {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  country_code: string;
  postal_code: number;
  phone: string;
  company: string;
  address_2: string;
  province: string;
}

async function addShippingAddress(
  access_token: string | undefined,
  customer_id: string,
  new_shipping_address: AddShippingAddressRequest,
): Promise<CustomerDTO> {
  const url = new URL(
    `/admin/customers/${customer_id}/shipping_addresses`,
    BACKEND_URL,
  );

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(new_shipping_address),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.customer;
}

interface UseAddShippingAddressParams {
  customer_id: string;
  new_shipping_address: AddShippingAddressRequest;
}

export function useAddShippingAddress(): UseMutationResult<
  CustomerDTO,
  HTTPError,
  UseAddShippingAddressParams,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      customer_id,
      new_shipping_address,
    }: UseAddShippingAddressParams) => {
      return addShippingAddress(
        user?.access_token,
        customer_id,
        new_shipping_address,
      );
    },
    mutationKey: [MUTATION_KEY.update_customer_shipping_address],
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
