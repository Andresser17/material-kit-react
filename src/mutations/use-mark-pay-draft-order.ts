import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { Order } from "@medusajs/types";
import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { MarkPayDraftOrderData } from "src/modals/mark-pay-draft-order-modal/mark-pay-draft-order-modal";
import { useUser } from "src/queries/use-user";

async function markPayDraftOrder(
  access_token: string | undefined,
  draft_order_id: string,
  data: MarkPayDraftOrderData,
): Promise<Order> {
  const url = new URL(`/admin/draft-orders/${draft_order_id}/pay`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...data,
      payment: { ...data.payment, amount: Number(data.payment.amount) },
      change: { ...data.change, amount: Number(data.change.amount) },
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new HTTPError(result.message, response);
  }

  return result.order;
}

interface UseCreateLotArgs {
  draft_order_id: string;
  data: MarkPayDraftOrderData;
}

export function useMarkPayDraftOrder(): UseMutationResult<
  Order,
  Error,
  UseCreateLotArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ draft_order_id, data }: UseCreateLotArgs) => {
      return markPayDraftOrder(user?.access_token, draft_order_id, data);
    },
    mutationKey: [MUTATION_KEY.mark_pay_draft_order],
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.draft_order],
      }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess(data) {
      // call pop up
      toast.success(`Draft order ${data.display_id} mark as paid`);
    },
  });
}
