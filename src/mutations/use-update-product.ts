import toast from "react-hot-toast";
import { Product, ProductRequest } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { SortableImageType } from "src/sections/product/add-images";

import uploadImages, { UploadedFile } from "./upload-images";

async function updateProduct(
  access_token: string | undefined,
  id: string,
  product: ProductRequest,
  thumbnail: UploadedFile | undefined,
  images: Array<UploadedFile> | undefined,
): Promise<Product> {
  const url = new URL(`/admin/products/${id}`, BACKEND_URL);
  const { collection: _, ...newProduct } = product;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...newProduct,
      tags: newProduct.tags.map((tag) => ({ value: tag.label, id: tag.id })),
      thumbnail: thumbnail ? thumbnail.url : undefined,
      images: images ? images : undefined,
    }),
  });
  if (!response.ok) throw new HTTPError("Failed on updating product", response);

  return await response.json();
}

type IUseUpdateProduct = UseMutateFunction<
  Product,
  Error,
  {
    id: string;
    product: ProductRequest;
    toUpload: SortableImageType[];
  },
  unknown
>;

export function useUpdateProduct(): IUseUpdateProduct {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({
      id,
      product,
      toUpload,
    }: {
      id: string;
      product: ProductRequest;
      toUpload: SortableImageType[];
    }) => {
      if (toUpload.length > 0) {
        const uploads = await uploadImages(user?.access_token, toUpload);
        const thumbnail = uploads[0];
        const images = uploads.slice(1);
        return updateProduct(
          user?.access_token,
          id,
          product,
          thumbnail,
          images,
        );
      }

      return updateProduct(
        user?.access_token,
        id,
        product,
        undefined,
        undefined,
      );
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

  return mutate;
}
