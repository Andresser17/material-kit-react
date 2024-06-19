import { ProductDTO, ProductOptionRequest } from "@medusajs/types";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function addProductOption(
  access_token: string | undefined,
  product_id: string,
  newProductOption: ProductOptionRequest,
): Promise<ProductDTO> {
  const url = new URL(`/admin/products/${product_id}/options`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      title: newProductOption.title,
    }),
  });
  if (!response.ok)
    throw new HTTPError("Failed on creating new product option", response);

  return await response.json();
}

interface IUseAddProductOptionArgs {
  product_id: string;
  newProductOption: ProductOptionRequest;
}

type IUseAddProductOption = UseMutateFunction<
  ProductDTO | undefined,
  Error,
  IUseAddProductOptionArgs,
  unknown
>;

export function useAddProductOption(): IUseAddProductOption {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
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

  return mutate;
}
