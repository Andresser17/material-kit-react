import { Product, ProductRequest } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

import { SortableImageType } from "src/sections/product/add-images";

import uploadImages from "./upload-images";

async function updateProduct(
  access_token: string | undefined,
  product_id: string,
  product: ProductRequest,
  images: SortableImageType[] | undefined,
): Promise<Product> {
  const url = new URL(`/admin/products/${product_id}`, BACKEND_URL);

  const newImages =
    images && images.length > 0
      ? images?.slice(1).map((image) => image.url)
      : [];
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...product,
      collection_id: product.collection_id ? product.collection_id : null,
      type: product.type
        ? { value: product.type?.value, id: product.type?.id }
        : product.type,
      thumbnail: images ? images[0].url : null,
      images: newImages ? newImages : null,
      tags: product.tags.map((tag) => {
        if (tag.id === "new-option") return { id: null, value: tag.value };
        return { id: tag.id, value: tag.value };
      }),
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface UseUpdateProductArgs {
  id: string;
  product: ProductRequest;
  toUpload: SortableImageType[];
}

export function useUpdateProduct(): UseMutationResult<
  Product,
  HTTPError,
  UseUpdateProductArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ id, product, toUpload }: UseUpdateProductArgs) => {
      if (toUpload.length > 0) {
        const uploads = await uploadImages(user?.access_token, toUpload);
        return updateProduct(user?.access_token, id, product, uploads);
      }

      return updateProduct(user?.access_token, id, product, undefined);
    },
    mutationKey: [MUTATION_KEY.update_product],
    onMutate: async (data) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.product, data.id],
      });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData([
        QUERY_KEY.product,
        data.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData([QUERY_KEY.product, data.id], data);

      // Return a context with the previous and new todo
      return { previousData, data };
    },
    // If the mutation fails, use the context we returned above
    onError: (err, _data, context) => {
      console.log(err);
      toast.error(err.message);

      queryClient.setQueryData(
        [QUERY_KEY.product, context?.data.id],
        context?.previousData,
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product] }),
    onSuccess: () => {
      // queryClient.setQueryData([QUERY_KEY.product, { id: variables.id }], data);
      toast.success("Product updated successfully");
    },
  });
}
