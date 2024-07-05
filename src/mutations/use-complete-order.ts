import { OrderResponse } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function completeOrder(
  access_token: string | undefined,
  order_id: string,
): Promise<OrderResponse> {
  const url = new URL(`/admin/orders/${order_id}/complete`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface UseCompleteOrderArgs {
  order_id: string;
}

export function useCompleteOrder(): UseMutationResult<
  OrderResponse,
  HTTPError,
  UseCompleteOrderArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ order_id }: UseCompleteOrderArgs) => {
      return completeOrder(user?.access_token, order_id);
    },
    mutationKey: [MUTATION_KEY.complete_order],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.order] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Order completed successfully");
    },
  });
}
