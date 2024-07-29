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
  update_variant: ProductVariantRequest,
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
      ...update_variant,
      inventory_quantity: update_variant?.inventory_quantity
        ? Number(update_variant.inventory_quantity)
        : null,
      width: update_variant?.width ? Number(update_variant.width) : null,
      length: update_variant?.length ? Number(update_variant.length) : null,
      height: update_variant?.height ? Number(update_variant.height) : null,
      weight: update_variant?.weight ? Number(update_variant.weight) : null,
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result.product;
}

interface IUseAddProductVariantArgs {
  product_id: string;
  variant_id: string;
  update_variant: ProductVariantRequest;
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
      update_variant,
    }: IUseAddProductVariantArgs) => {
      return updateProductVariant(
        user?.access_token,
        product_id,
        variant_id,
        update_variant,
      );
    },
    mutationKey: [MUTATION_KEY.update_product_variant],
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
