import { ShippingOption } from "@medusajs/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

interface ShippingOptionsQuery {
  region_id: string;
  is_return: boolean;
}

interface ShippingOptionsResponse {
  shipping_options: ShippingOption[];
  count: number;
  offset: number;
  limit: number;
}

async function getShippingOptions(
  access_token: string,
  query: ShippingOptionsQuery,
): Promise<ShippingOptionsResponse> {
  const url = new URL(`/admin/shipping-options`, BACKEND_URL);
  if (query?.region_id) url.searchParams.append("region_id", query?.region_id);
  if (query?.is_return)
    url.searchParams.append("is_return", query?.is_return.toString());
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseListShippingOptions {
  query: ShippingOptionsQuery;
}

export function useListShippingOptions({
  query,
}: IUseListShippingOptions): UseQueryResult<
  ShippingOptionsResponse,
  HTTPError
> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.shipping_options, user?.access_token, query],
    queryFn: async ({ queryKey }): Promise<ShippingOptionsResponse> =>
      getShippingOptions(
        queryKey[1] as string,
        queryKey[2] as ShippingOptionsQuery,
      ),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });
}
