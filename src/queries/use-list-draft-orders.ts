import { DraftOrder } from "@medusajs/types";
import { useMutationState, useQuery } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

interface DraftOrdersResponse {
  draft_orders: DraftOrder[] | null;
  count: number;
  offset: number;
  limit: number;
}

interface IListDraftOrders {
  query?: {
    limit: number;
  };
}

async function listDraftOrders({
  access_token,
  query,
}: IListDraftOrders & {
  access_token: string;
}): Promise<DraftOrdersResponse | null> {
  const url = new URL("/admin/draft-orders", BACKEND_URL);
  if (query?.limit) url.searchParams.append("limit", query?.limit.toString());
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get draft orders request", response);

  return await response.json();
}

export function useListDraftOrders({
  query,
}: IListDraftOrders): DraftOrdersResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.draft_order, user?.access_token, query],
    queryFn: async ({ queryKey }): Promise<DraftOrdersResponse | null> =>
      listDraftOrders({
        access_token: queryKey[1] as string,
        query: queryKey[2] as IListDraftOrders["query"],
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

  if (Array.isArray(data?.draft_orders)) {
    return data;
  }

  return {
    draft_orders: data?.draft_orders ? [data.draft_orders] : null,
    count: data?.count ? data.count : 1,
    offset: data?.offset ? data.offset : 0,
    limit: data?.limit ? data.limit : 1,
  };
}
