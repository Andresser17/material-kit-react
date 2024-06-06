import { Lot } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface LotsResponse {
  lots: Lot[] | null;
  count: number;
  offset: number;
  limit: number;
}

async function listLots({
  access_token,
  query,
}: IUseListOrders & { access_token: string }): Promise<LotsResponse | null> {
  const url = new URL(`/admin/lots`, BACKEND_URL);
  if (query?.limit) url.searchParams.append("limit", query?.limit.toString());
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new HTTPError("Failed on get lots request", response);

  return await response.json();
}

interface IUseListOrders {
  query?: {
    limit: number;
  };
}

export function useListLots({ query }: IUseListOrders): LotsResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.lot, user?.access_token, query],
    queryFn: async ({ queryKey }): Promise<LotsResponse | null> =>
      listLots({
        access_token: queryKey[1] as string,
        query: queryKey[2] as IUseListOrders["query"],
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
    lots: data?.lots ? data.lots : null,
    count: data?.count ? data.count : 0,
    offset: data?.offset ? data.offset : 0,
    limit: data?.limit ? data.limit : 0,
  };
}
