import toast from "react-hot-toast";
import { ProductDTO } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

interface DeleteVariantResponse {
  variant_id: string;
  object: string;
  deleted: boolean;
  product: ProductDTO;
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
  if (!response.ok) throw new Error("Failed on deleting product variant");

  return await response.json();
}

type IUseDeleteProductVariant = UseMutateFunction<
  DeleteVariantResponse | undefined,
  Error,
  { product_id: string; variant_id: string },
  unknown
>;

export function useDeleteProductVariant(): IUseDeleteProductVariant {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      product_id,
      variant_id,
    }: {
      product_id: string;
      variant_id: string;
    }) => {
      return deleteProductVariant(user?.access_token, product_id, variant_id);
    },
    mutationKey: [MUTATION_KEY.delete_product_variant],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.productVariant] }),
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
