import { ShippingOptionDTO } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface ShippingOptionsQuery {
  region_id: string;
  is_return: boolean;
}

interface getShippingOptionsResponse {
  shipping_options: ShippingOptionDTO[];
  count: number;
  offset: number;
  limit: number;
}

async function getShippingOptions(
  access_token: string,
  query: ShippingOptionsQuery,
): Promise<getShippingOptionsResponse> {
  const url = new URL(`/admin/shipping-options`, BACKEND_URL);
  if (query?.region_id) url.searchParams.append("region_id", query?.region_id);
  if (query?.is_return)
    url.searchParams.append("is_return", query?.is_return.toString());
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get shipping options", response);

  return await response.json();
}

interface IUseListShippingOptions {
  query: ShippingOptionsQuery;
}

export function useListShippingOptions({
  query,
}: IUseListShippingOptions): getShippingOptionsResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.shipping_options, user?.access_token, query],
    queryFn: async ({ queryKey }): Promise<getShippingOptionsResponse | null> =>
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

  useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: "pending" },
    // select: (mutation) => mutation.state.variables,
  });

  return {
    shipping_options: data?.shipping_options ? data.shipping_options : [],
    count: data?.count ? data.count : 1,
    offset: data?.offset ? data.offset : 0,
    limit: data?.limit ? data.limit : 1,
  };
}
