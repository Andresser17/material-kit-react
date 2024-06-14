import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";
import { Product, ProductRequest } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

async function addProduct(
  access_token: string | undefined,
  newProduct: { title: string },
): Promise<Product> {
  const url = new URL("/admin/products", BACKEND_URL);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(newProduct),
  });
  if (!response.ok)
    throw new HTTPError("Failed on creating new product", response);

  const data = await response.json();
  return data.product;
}

interface UseAddProductParams {
  newProduct: { title: string };
}

interface UseAddProductResponse {
  data: Product | undefined;
  mutate: UseMutateFunction<
    Product | undefined,
    Error,
    UseAddProductParams,
    unknown
  >;
  isSuccess: boolean;
}

export function useAddProduct(
  resetForm: UseFormReset<ProductRequest>,
): UseAddProductResponse {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data, mutate, isSuccess } = useMutation({
    mutationFn: async ({ newProduct }: UseAddProductParams) => {
      return addProduct(user?.access_token, newProduct);
    },
    mutationKey: [MUTATION_KEY.add_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_products] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product added successfully");
      resetForm();
    },
  });

  return { data, mutate, isSuccess };
}
