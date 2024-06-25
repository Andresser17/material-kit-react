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

interface DeleteDraftOrder {
  id: string;
  object: string;
  deleted: boolean;
}

async function deleteDraftOrder(
  access_token: string | undefined,
  draft_order_id: string,
): Promise<DeleteDraftOrder> {
  const url = new URL(`/admin/draft-orders/${draft_order_id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on deleting draft order", response);

  return await response.json();
}

interface UseCreateLotArgs {
  draft_order_id: string;
}

export function useDeleteDraftOrder(): UseMutationResult<
  DeleteDraftOrder,
  Error,
  UseCreateLotArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ draft_order_id }: UseCreateLotArgs) => {
      return deleteDraftOrder(user?.access_token, draft_order_id);
    },
    mutationKey: [MUTATION_KEY.delete_draft_order],
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.list_draft_orders],
      }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Draft order deleted successfully");

      navigate(`/draft-orders`);
    },
  });
}
