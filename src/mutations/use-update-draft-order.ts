import { DraftOrderRequest, DraftOrderResponse } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function updateDraftOrder(
  access_token: string | undefined,
  draft_order_id: string,
  draft_order: DraftOrderRequest,
): Promise<DraftOrderResponse> {
  const url = new URL(`/admin/draft-orders/${draft_order_id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(draft_order),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface UseUpdateDraftOrderArgs {
  draft_order_id: string;
  draft_order: DraftOrderRequest;
}

export function useUpdateDraftOrder(): UseMutationResult<
  DraftOrderResponse,
  HTTPError,
  UseUpdateDraftOrderArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      draft_order_id,
      draft_order,
    }: UseUpdateDraftOrderArgs) => {
      return updateDraftOrder(user?.access_token, draft_order_id, draft_order);
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
      toast.success("Draft order updated successfully");
    },
  });
}
