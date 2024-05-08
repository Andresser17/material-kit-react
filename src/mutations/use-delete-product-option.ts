import toast from "react-hot-toast";
import { ProductDTO } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

interface DeleteProductResponse {
  option_id: string;
  object: string;
  deleted: boolean;
  product: ProductDTO;
}

async function deleteProductOption(
  access_token: string | undefined,
  product_id: string,
  option_id: string,
): Promise<DeleteProductResponse> {
  const url = new URL(
    `/admin/products/${product_id}/options/${option_id}`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on deleting product option");

  return await response.json();
}

type IUseDeleteProductOption = UseMutateFunction<
  DeleteProductResponse | undefined,
  Error,
  { product_id: string; option_id: string },
  unknown
>;

export function useDeleteProductOption(): IUseDeleteProductOption {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      product_id,
      option_id,
    }: {
      product_id: string;
      option_id: string;
    }) => {
      return deleteProductOption(user?.access_token, product_id, option_id);
    },
    mutationKey: [MUTATION_KEY.delete_product_option],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.productOption] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product option deleted successfully");
    },
  });

  return mutate;
}
