import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DraftOrder, DraftOrderRequest } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

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
  if (!response.ok) throw new Error("Failed on creating new draft order");

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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.draftOrder] }),
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
