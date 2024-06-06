import { Product } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface IListProducts {
  params?: {
    product_id: string;
  };
  query?: {
    limit: number;
  };
}

async function listProducts({
  access_token,
  params,
  query,
}: IListProducts & { access_token: string }): Promise<ProductsList | null> {
  const product_id = params?.product_id ? `/${params.product_id}` : "";
  const url = new URL(`/admin/products${product_id}`, BACKEND_URL);
  if (query?.limit) url.searchParams.append("limit", query?.limit.toString());
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get products request", response);

  return await response.json();
}

interface ProductsList {
  products: Product[] | null;
  count: number;
  offset: number;
  limit: number;
}

export function useListProducts({
  params,
  query,
}: IListProducts): ProductsList {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.list_products, user?.access_token, params, query],
    queryFn: async ({ queryKey }): Promise<ProductsList | null> =>
      listProducts({
        access_token: queryKey[1] as string,
        params: queryKey[2] as IListProducts["params"],
        query: queryKey[3] as IListProducts["query"],
      }),
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

  if (Array.isArray(data?.products)) {
    return data;
  }

  return {
    products: data?.products ? [data.products] : null,
    count: data?.count ? data.count : 1,
    offset: data?.offset ? data.offset : 0,
    limit: data?.limit ? data.limit : 1,
  };
}
