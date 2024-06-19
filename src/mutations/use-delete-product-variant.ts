import { Product } from "@medusajs/types";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

interface DeleteVariantResponse {
  variant_id: string;
  object: string;
  deleted: boolean;
  product: Product;
}

async function deleteProductVariant(
  access_token: string | undefined,
  product_id: string,
  variant_id: string,
): Promise<DeleteVariantResponse> {
  const url = new URL(
    `/admin/products/${product_id}/variants/${variant_id}`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok)
    throw new HTTPError("Failed on deleting product variant", response);

  return await response.json();
}

interface IUseDeleteProductVariantArgs {
  product_id: string;
  variant_id: string;
}

type IUseDeleteProductVariant = UseMutateFunction<
  DeleteVariantResponse | undefined,
  Error,
  IUseDeleteProductVariantArgs,
  unknown
>;

export function useDeleteProductVariant(): IUseDeleteProductVariant {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      product_id,
      variant_id,
    }: IUseDeleteProductVariantArgs) => {
      return deleteProductVariant(user?.access_token, product_id, variant_id);
    },
    mutationKey: [MUTATION_KEY.delete_product_variant],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product variant deleted successfully");
    },
  });

  return mutate;
}
