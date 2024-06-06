import { OrderDTO } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface OrdersResponse {
  orders: OrderDTO[] | null;
  count: number;
  offset: number;
  limit: number;
}

async function listOrders({
  access_token,
  query,
}: IUseListOrders & { access_token: string }): Promise<OrdersResponse | null> {
  const url = new URL(`/admin/orders`, BACKEND_URL);
  if (query?.limit) url.searchParams.append("limit", query?.limit.toString());
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get orders request", response);

  return await response.json();
}

interface IUseListOrders {
  query?: {
    limit: number;
  };
}

export function useListOrders({ query }: IUseListOrders): OrdersResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.order, user?.access_token, query],
    queryFn: async ({ queryKey }): Promise<OrdersResponse | null> =>
      listOrders({
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

  if (Array.isArray(data?.orders)) {
    return data;
  }

  return {
    orders: data?.orders ? [data.orders] : null,
    count: data?.count ? data.count : 1,
    offset: data?.offset ? data.offset : 0,
    limit: data?.limit ? data.limit : 1,
  };
}
