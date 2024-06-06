import { useQuery } from "@tanstack/react-query";
import { ProductVariant } from "@medusajs/types";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL } from "src/config";

import { useUser } from "./use-user";

async function listProductTypes({
  access_token,
  product_id,
}: {
  access_token: string;
  product_id: string;
}): Promise<IProductVariants | null> {
  const url = new URL(`/admin/products/${product_id}/variants`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on get product types request", response);

  return await response.json();
}

interface IProductVariants {
  count: number;
  variants: ProductVariant[];
  offset: number;
  limit: number;
}

export function useListProductVariants({
  product_id,
}: {
  product_id: string;
}): IProductVariants {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.product_type, user?.access_token, product_id],
    queryFn: async ({ queryKey }): Promise<IProductVariants | null> =>
      listProductTypes({
        access_token: queryKey[1] as string,
        product_id: queryKey[2] as string,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });

  return {
    count: data?.count ?? 0,
    variants: data?.variants ?? [],
    offset: data?.offset ?? 0,
    limit: data?.limit ?? 0,
  };
}
