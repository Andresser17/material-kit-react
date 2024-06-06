import toast from "react-hot-toast";
import { ProductVariantDTO, ProductVariantRequest } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

async function addProductVariant(
  access_token: string | undefined,
  product_id: string,
  newProductVariant: ProductVariantRequest,
): Promise<ProductVariantDTO> {
  const url = new URL(`/admin/products/${product_id}/variants`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(newProductVariant),
  });
  if (!response.ok)
    throw new HTTPError("Failed on creating new product variant", response);

  return await response.json();
}

type IUseAddProductVariant = UseMutateFunction<
  ProductVariantDTO | undefined,
  Error,
  { product_id: string; newProductVariant: ProductVariantRequest },
  unknown
>;

export function useAddProductVariant(): IUseAddProductVariant {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      product_id,
      newProductVariant,
    }: {
      product_id: string;
      newProductVariant: ProductVariantRequest;
    }) => {
      return addProductVariant(
        user?.access_token,
        product_id,
        newProductVariant,
      );
    },
    mutationKey: [MUTATION_KEY.add_product_variant],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product_variant] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product variant added successfully");
    },
  });

  return mutate;
}
