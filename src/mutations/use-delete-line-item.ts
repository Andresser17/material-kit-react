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

interface DeleteLineItemResponse {
  draft_order: DraftOrder;
}

async function deleteLineItem(
  access_token: string | undefined,
  draft_order_id: string,
  line_item_id: string,
): Promise<DeleteLineItemResponse> {
  const url = new URL(
    `/admin/draft-orders/${draft_order_id}/line-items/${line_item_id}`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new HTTPError(result.message, response);
  }

  return result;
}

interface IUseDeleteLineItem {
  draft_order_id: string;
  line_item_id: string;
}

export function useDeleteLineItem(): UseMutationResult<
  DeleteLineItemResponse,
  HTTPError,
  IUseDeleteLineItem,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      draft_order_id,
      line_item_id,
    }: IUseDeleteLineItem) => {
      return deleteLineItem(user?.access_token, draft_order_id, line_item_id);
    },
    mutationKey: [MUTATION_KEY.delete_line_item],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.draft_order] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Line Item deleted successfully");
    },
  });
}
