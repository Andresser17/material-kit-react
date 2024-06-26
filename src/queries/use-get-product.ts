import { Product } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface GetProductResponse {
  product: Product;
}

async function getProduct(
  access_token: string,
  product_id: string,
): Promise<GetProductResponse | null> {
  const url = new URL(`/admin/products/${product_id}`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get product request", response);

  return await response.json();
}

export function useGetProduct(product_id: string): Product | undefined {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.product, user?.access_token, product_id],
    queryFn: async ({ queryKey }): Promise<GetProductResponse | null> =>
      getProduct(queryKey[1] as string, queryKey[2] as string),
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

  return data?.product;
}
