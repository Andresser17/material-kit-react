import { UseQueryResult, useQuery } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { Order } from "@medusajs/types";
import { useUser } from "./use-user";

interface IGetOrder {
  access_token: string;
  order_id: string;
}

async function getOrder({ access_token, order_id }: IGetOrder): Promise<Order> {
  const url = new URL(`/admin/orders/${order_id}`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.order;
}

interface IUseGetOrder {
  order_id: string;
}

export function useGetOrder({
  order_id,
}: IUseGetOrder): UseQueryResult<Order, HTTPError> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.draft_order, user?.access_token, order_id],
    queryFn: async ({ queryKey }): Promise<Order> =>
      getOrder({
        access_token: queryKey[1] as string,
        order_id: queryKey[2] as string,
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
