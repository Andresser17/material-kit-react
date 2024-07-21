import { Product } from "@medusajs/types";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

interface ProductOptionRequest {
  title: string;
}

async function addProductOption(
  access_token: string | undefined,
  product_id: string,
  new_product_option: ProductOptionRequest,
): Promise<Product> {
  const url = new URL(`/admin/products/${product_id}/options`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      title: new_product_option.title,
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseAddProductOptionArgs {
  product_id: string;
  newProductOption: ProductOptionRequest;
}

export function useAddProductOption(): UseMutationResult<
  Product,
  HTTPError,
  IUseAddProductOptionArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      product_id,
      newProductOption,
    }: IUseAddProductOptionArgs) => {
      return addProductOption(user?.access_token, product_id, newProductOption);
    },
    mutationKey: [MUTATION_KEY.add_product_option],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product_option] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product option added successfully");
    },
  });
}
