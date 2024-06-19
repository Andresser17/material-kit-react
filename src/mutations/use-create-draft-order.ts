import { DraftOrder, DraftOrderRequest } from "@medusajs/types";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

interface CreateDraftOrderResponse {
  draft_order: DraftOrder;
}

async function createDraftOrder(
  access_token: string | undefined,
  newDraftOrder: DraftOrderRequest,
): Promise<CreateDraftOrderResponse> {
  const url = new URL("/admin/draft-orders", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(newDraftOrder),
  });
  if (!response.ok)
    throw new HTTPError("Failed on creating new draft order", response);

  return await response.json();
}

type IUseCreateDraftOrder = UseMutateFunction<
  CreateDraftOrderResponse | undefined,
  Error,
  { newDraftOrder: DraftOrderRequest },
  unknown
>;

export function useCreateDraftOrder(
  resetForm: UseFormReset<DraftOrder>,
): IUseCreateDraftOrder {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async ({
      newDraftOrder,
    }: {
      newDraftOrder: DraftOrderRequest;
    }) => {
      return createDraftOrder(user?.access_token, newDraftOrder);
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
      resetForm();
      navigate(`/draft-orders/${data.draft_order.id}`);
    },
  });

  return mutate;
}
