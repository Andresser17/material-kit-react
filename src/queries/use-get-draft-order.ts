import { DraftOrderResponse } from "@medusajs/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

interface IGetDraftOrder {
  draft_order_id: string;
}

async function getDraftOrder({
  access_token,
  draft_order_id,
}: IGetDraftOrder & {
  access_token: string;
}): Promise<DraftOrderResponse | null> {
  const url = new URL(`/admin/draft-orders/${draft_order_id}`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get draft order by id", response);

  const { draft_order }: { draft_order: DraftOrderResponse } =
    await response.json();

  return draft_order;
}

export function useGetDraftOrder({
  draft_order_id,
}: IGetDraftOrder): UseQueryResult<DraftOrderResponse, HTTPError> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.draft_order, user?.access_token, draft_order_id],
    queryFn: async ({ queryKey }): Promise<DraftOrderResponse | null> =>
      getDraftOrder({
        access_token: queryKey[1] as string,
        draft_order_id: queryKey[2] as string,
      }),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });
}
