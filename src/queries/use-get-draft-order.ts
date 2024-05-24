import { DraftOrderResponse } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface GetDraftOrderResponse {
  draft_order: DraftOrderResponse | null;
}

interface IGetDraftOrder {
  draft_order_id: string;
}

async function getDraftOrder({
  access_token,
  draft_order_id,
}: IGetDraftOrder & {
  access_token: string;
}): Promise<GetDraftOrderResponse | null> {
  const url = new URL(`/admin/draft-orders/${draft_order_id}`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get draft order by id");

  return await response.json();
}

export function useGetDraftOrder({
  draft_order_id,
}: IGetDraftOrder): GetDraftOrderResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.draftOrder, user?.access_token, draft_order_id],
    queryFn: async ({ queryKey }): Promise<GetDraftOrderResponse | null> =>
      getDraftOrder({
        access_token: queryKey[1] as string,
        draft_order_id: queryKey[2] as string,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });

  useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: "pending" },
    // select: (mutation) => mutation.state.variables,
  });

  return {
    draft_order: data?.draft_order ?? null,
  };
}
