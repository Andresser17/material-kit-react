import { DraftOrder } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

interface LineItemRequest {
  title?: string;
  quantity: number;
  unit_price?: number;
}

async function updateLineItem(
  access_token: string | undefined,
  draft_order_id: string,
  line_item_id: string,
  update_line_item: LineItemRequest,
): Promise<DraftOrder> {
  const url = new URL(
    `/admin/draft-orders/${draft_order_id}/line-items/${line_item_id}`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(update_line_item),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.draft_order;
}

interface UseUpdateLineItemArgs {
  draft_order_id: string;
  line_item_id: string;
  update_line_item: LineItemRequest;
}

export function useUpdateLineItem(): UseMutationResult<
  DraftOrder,
  HTTPError,
  UseUpdateLineItemArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      draft_order_id,
      line_item_id,
      update_line_item,
    }: UseUpdateLineItemArgs) => {
      return updateLineItem(
        user?.access_token,
        draft_order_id,
        line_item_id,
        update_line_item,
      );
    },
    mutationKey: [MUTATION_KEY.update_line_item],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.draft_order] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Line Item updated successfully");
    },
  });
}
