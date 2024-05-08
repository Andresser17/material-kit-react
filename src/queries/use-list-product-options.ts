import { useQuery } from "@tanstack/react-query";
import { ProductVariantDTO } from "@medusajs/types";

import { QUERY_KEY, BACKEND_URL } from "src/config";

import { useUser } from "./use-user";

async function listProductTypes({
  access_token,
  product_id,
}: {
  access_token: string;
  product_id: string;
}): Promise<IProductVariants | null> {
  const url = new URL(`/admin/products/${product_id}/options`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get product types request");

  return await response.json();
}

interface IProductVariants {
  variants: ProductVariantDTO[];
}

export function useListProductVariants({
  product_id,
}: {
  product_id: string;
}): IProductVariants {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.productType, user?.access_token, product_id],
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

  // useMutationState({
  //   filters: { mutationKey: [MUTATION_KEY], status: "pending" },
  //   // select: (mutation) => mutation.state.variables,
  // });

  return {
    variants: data?.variants ?? [],
  };
}
