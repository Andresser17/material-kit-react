import { DraftOrder, DraftOrderRequest } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

export interface DraftOrderResponse {
  draft_order: DraftOrder;
}

async function createDraftOrder(
  access_token: string | undefined,
  new_draft_order: DraftOrderRequest,
): Promise<DraftOrderResponse> {
  const url = new URL("/admin/draft-orders", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(new_draft_order),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseCreateDraftOrderArgs {
  new_draft_order: DraftOrderRequest;
}

export function useCreateDraftOrder(): UseMutationResult<
  DraftOrderResponse,
  HTTPError,
  IUseCreateDraftOrderArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ new_draft_order }: IUseCreateDraftOrderArgs) => {
      return createDraftOrder(user?.access_token, new_draft_order);
    },
    mutationKey: [MUTATION_KEY.create_draft_order],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.draft_order] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess(data) {
      // call pop up
      toast.success("Draft order created successfully");
      navigate(`/draft-orders/${data.draft_order.id}`);
    },
  });
}
