import { Order } from "@medusajs/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

export interface OrdersResponse {
  orders: Order[];
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
  if (query?.customer_id)
    url.searchParams.append("customer_id", query?.customer_id);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseListOrders {
  query?: {
    limit?: number;
    customer_id?: string;
  };
}

export function useListOrders({
  query,
}: IUseListOrders): UseQueryResult<OrdersResponse, HTTPError> {
  const { user } = useUser();

  return useQuery({
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
}
