import toast from "react-hot-toast";
import { ProductDTO, ProductOptionRequest } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

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
  if (!response.ok) throw new Error("Failed on creating new product option");

  return await response.json();
}

type IUseAddProductOption = UseMutateFunction<
  ProductDTO | undefined,
  Error,
  { product_id: string; newProductOption: ProductOptionRequest },
  unknown
>;

export function useAddProductOption(): IUseAddProductOption {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      product_id,
      newProductOption,
    }: {
      product_id: string;
      newProductOption: ProductOptionRequest;
    }) => {
      return addProductOption(user?.access_token, product_id, newProductOption);
    },
    mutationKey: [MUTATION_KEY.add_product_option],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.productOption] }),
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
