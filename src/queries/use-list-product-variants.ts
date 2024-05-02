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
  const url = new URL(`/admin/products/${product_id}/variants`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get product types request");

  return await response.json();
}

// export type ProductVariant = {
//   id
// string
// REQUIRED
// The product variant's ID
// created_at
// Date
// REQUIRED
// The date with timezone at which the resource was created.
// updated_at
// Date
// REQUIRED
// The date with timezone at which the resource was updated.
// deleted_at
// null | Date
// REQUIRED
// The date with timezone at which the resource was deleted.
// title
// string
// REQUIRED
// A title that can be displayed for easy identification of the Product Variant.
// product_id
// string
// REQUIRED
// The ID of the product that the product variant belongs to.
// product
// Product
// REQUIRED
// The details of the product that the product variant belongs to.
// prices: MoneyAmount[];
// sku?: string;
// barcode?: string;
// ean?: string;
// upc?: string;
// variant_rank?: number
// inventory_quantity: number;
// allow_backorder: boolean;
// manage_inventory: boolean;
// hs_code?: string;
// origin_country?: string;
// mid_code?: string;
// material?: string;
// weight?: number;
// length?: number;
// height?: number,
// width?: number,
// options: ProductOptionValue[],
// inventory_items: ProductVariantInventoryItem[],
// metadata?: Record<string, unknown>
// };

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
