import { ProductDTO, ProductStatus } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

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
  if (!response.ok) throw new Error("Failed on get products request");

  return await response.json();
}

export type Product = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  handle: string;
  is_giftcard: boolean;
  status: ProductStatus;
  thumbnail: string;
  profile_id: string;
  weight: string | null;
  length: string | null;
  height: string | null;
  width: string | null;
  hs_code: string | null;
  origin_country: string | null;
  mid_code: string | null;
  material: string | null;
  collection_id: string;
  type_id: string;
  discountable: boolean;
  external_id: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  metadata: { [key: string]: unknown };
};

interface ProductsList {
  products: ProductDTO[] | null;
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
