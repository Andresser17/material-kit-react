import { Product, ProductVariantRequest } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function updateProductVariant(
  access_token: string | undefined,
  product_id: string,
  variant_id: string,
  variant: ProductVariantRequest,
): Promise<Product> {
  const url = new URL(
    `/admin/products/${product_id}/variants/${variant_id}`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...variant,
      inventory_quantity: variant?.inventory_quantity
        ? Number(variant.inventory_quantity)
        : null,
      width: variant?.width ? Number(variant.width) : null,
      length: variant?.length ? Number(variant.length) : null,
      height: variant?.height ? Number(variant.height) : null,
      weight: variant?.weight ? Number(variant.weight) : null,
    }),
  });
  if (!response.ok)
    throw new HTTPError("Failed on updating product variant", response);

  const result = await response.json();

  return result.product;
}

interface IUseAddProductVariantArgs {
  product_id: string;
  variant_id: string;
  variant: ProductVariantRequest;
}

export function useUpdateProductVariant(): UseMutationResult<
  Product,
  Error,
  IUseAddProductVariantArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      product_id,
      variant_id,
      variant,
    }: IUseAddProductVariantArgs) => {
      return updateProductVariant(
        user?.access_token,
        product_id,
        variant_id,
        variant,
      );
    },
    mutationKey: [MUTATION_KEY.add_product_variant],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Variant updated successfully");
    },
  });
}
