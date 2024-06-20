import { ProductVariantDTO, ProductVariantRequest } from "@medusajs/types";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function addProductVariant(
  access_token: string | undefined,
  product_id: string,
  variant: ProductVariantRequest,
): Promise<ProductVariantDTO> {
  const url = new URL(`/admin/products/${product_id}/variants`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...variant,
      inventory_quantity: Number(variant.inventory_quantity),
      width: Number(variant.width),
      length: Number(variant.length),
      height: Number(variant.height),
      weight: Number(variant.weight),
    }),
  });
  if (!response.ok)
    throw new HTTPError("Failed on creating new product variant", response);

  return await response.json();
}

interface IUseAddProductVariantArgs {
  product_id: string;
  newProductVariant: ProductVariantRequest;
}

type IUseAddProductVariant = UseMutateFunction<
  ProductVariantDTO | undefined,
  Error,
  IUseAddProductVariantArgs,
  unknown
>;

export function useAddProductVariant(): IUseAddProductVariant {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      product_id,
      newProductVariant,
    }: IUseAddProductVariantArgs) => {
      return addProductVariant(
        user?.access_token,
        product_id,
        newProductVariant,
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
      toast.success("Variant added successfully");
    },
  });

  return mutate;
}
