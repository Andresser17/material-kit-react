import { Warranty } from "@medusajs/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

async function listWarranties({
  access_token,
  query,
}: IUseListWarranties & { access_token: string }): Promise<Warranty[]> {
  const url = new URL(`/admin/orders`, BACKEND_URL);

  if (query?.order_id)
    url.searchParams.append("order_id", query?.order_id.toString());

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.warranties;
}

interface IUseListWarranties {
  query?: {
    order_id: string;
  };
}

export function useListWarranties({
  query,
}: IUseListWarranties): UseQueryResult<Warranty[], HTTPError> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.order, user?.access_token, query],
    queryFn: async ({ queryKey }): Promise<Warranty[]> =>
      listWarranties({
        access_token: queryKey[1] as string,
        query: queryKey[2] as IUseListWarranties["query"],
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
