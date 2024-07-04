import { DraftOrderResponse } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

export interface AddressRequest {
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  country_code: string;
  province: string;
  postal_code: string;
  metadata: Record<string, unknown>;
}

async function updateDraftOrderShippingAddress(
  access_token: string | undefined,
  draft_order_id: string,
  shipping_address: AddressRequest,
): Promise<DraftOrderResponse> {
  const url = new URL(`/admin/draft-orders/${draft_order_id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ shipping_address }),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface UseUpdateDraftOrderShippingAddressArgs {
  draft_order_id: string;
  shipping_address: AddressRequest;
}

export function useUpdateDraftOrderShippingAddress(): UseMutationResult<
  DraftOrderResponse,
  HTTPError,
  UseUpdateDraftOrderShippingAddressArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      draft_order_id,
      shipping_address,
    }: UseUpdateDraftOrderShippingAddressArgs) => {
      return updateDraftOrderShippingAddress(
        user?.access_token,
        draft_order_id,
        shipping_address,
      );
    },
    mutationKey: [MUTATION_KEY.update_draft_order],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.draft_order] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Draft order shipping address updated successfully");
    },
  });
}
