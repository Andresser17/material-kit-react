import toast from "react-hot-toast";
import { ProductDTO, ProductOptionRequest } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

async function updateProductOption(
  access_token: string | undefined,
  product_id: string,
  option: ProductOptionRequest,
): Promise<ProductDTO> {
  const url = new URL(
    `/admin/products/${product_id}/options/${option.id}`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      title: option.title,
    }),
  });
  if (!response.ok)
    throw new HTTPError("Failed on updating product option", response);

  return await response.json();
}

type IUseUpdateProductOption = UseMutateFunction<
  ProductDTO | undefined,
  Error,
  { product_id: string; option: ProductOptionRequest },
  unknown
>;

export function useUpdateProductOption(): IUseUpdateProductOption {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      product_id,
      option,
    }: {
      product_id: string;
      option: ProductOptionRequest;
    }) => {
      return updateProductOption(user?.access_token, product_id, option);
    },
    mutationKey: [MUTATION_KEY.update_product_option],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product_option] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product option updated successfully");
    },
  });

  return mutate;
}
