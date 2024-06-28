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

interface CreateLineItemResponse {
  draft_order: DraftOrder;
}

interface CreateLineItemRequest {
  variant_id: string;
  quantity: number;
}

async function createLineItem(
  access_token: string | undefined,
  draft_order_id: string,
  new_line_item: CreateLineItemRequest,
): Promise<CreateLineItemResponse> {
  const url = new URL(
    `/admin/draft-orders/${draft_order_id}/line-items`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(new_line_item),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new HTTPError(result.message, response);
  }

  return result;
}

interface IUseCreateLineItem {
  draft_order_id: string;
  new_line_item: CreateLineItemRequest;
}

export function useCreateLineItem(): UseMutationResult<
  CreateLineItemResponse,
  HTTPError,
  IUseCreateLineItem,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      draft_order_id,
      new_line_item,
    }: IUseCreateLineItem) => {
      return createLineItem(user?.access_token, draft_order_id, new_line_item);
    },
    mutationKey: [MUTATION_KEY.create_line_item],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.draft_order] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Line Item created successfully");
    },
  });
}
