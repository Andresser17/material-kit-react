import { Product } from "@medusajs/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

async function getProduct(
  access_token: string,
  product_id: string,
): Promise<Product> {
  const url = new URL(`/admin/products/${product_id}`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.product;
}

export function useGetProduct(
  product_id: string,
): UseQueryResult<Product, HTTPError> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.product, user?.access_token, product_id],
    queryFn: async ({ queryKey }): Promise<Product> =>
      getProduct(queryKey[1] as string, queryKey[2] as string),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });
}
