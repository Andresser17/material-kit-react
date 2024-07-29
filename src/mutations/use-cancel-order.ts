import { Order } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function cancelOrder(
  access_token: string | undefined,
  order_id: string,
): Promise<Order> {
  const url = new URL(`/admin/orders/${order_id}/cancel`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.order;
}

interface IUseCancelOrderArgs {
  order_id: string;
}

export function useCancelOrder(): UseMutationResult<
  Order,
  HTTPError,
  IUseCancelOrderArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ order_id }: IUseCancelOrderArgs) => {
      return cancelOrder(user?.access_token, order_id);
    },
    mutationKey: [MUTATION_KEY.cancel_order],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.order] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Order cancelled successfully");
    },
  });
}
