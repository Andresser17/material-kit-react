import toast from "react-hot-toast";
import { DraftOrder } from "@medusajs/types";
import { UseFormReset } from "react-hook-form";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { DraftOrderStatus } from "src/enums";
import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

async function createDraftOrder(
  access_token: string | undefined,
  newDraftOrder: DraftOrderRequest,
): Promise<DraftOrder> {
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

export interface DraftOrderItem {
  quantity: number;
  variant_id: string;
  unit_price: number;
  title: string;
  metadata: Record<string, unknown>;
}

export interface DraftOrderRequest extends DraftOrder {
  email: string;
  region_id: string;
  shipping_methods: {
    option_id: string;
    data: {
      name: string;
      cedula: string;
      phone_number: string;
    };
    price: number;
  }[];
  status: DraftOrderStatus;
  billing_address: this["shipping_address"];
  shipping_address: {
    first_name: string;
    last_name: string;
    phone: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    country_code: string;
    province: string;
    postal_code: string;
    metadata: Record<string, unknown>;
  };
  items: DraftOrderItem[];
  discounts: { code: string }[];
  customer_id: string;
  no_notification_order: boolean;
  metadata: Record<string, unknown>;
}

type IUseCreateDraftOrder = UseMutateFunction<
  DraftOrder | undefined,
  Error,
  { newDraftOrder: DraftOrderRequest },
  unknown
>;

export function useCreateDraftOrder(
  resetForm: UseFormReset<DraftOrder>,
): IUseCreateDraftOrder {
  const queryClient = useQueryClient();
  const { user } = useUser();

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
    onSuccess() {
      // call pop up
      toast.success("Draft order created successfully");
      resetForm();
    },
  });

  return mutate;
}
