import toast from "react-hot-toast";
import { ProductDTO } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { SortableImageType } from "src/sections/add-product/add-images";

import uploadImages, { UploadedFile } from "./uploadImages";

async function updateProduct(
  access_token: string | undefined,
  id: string,
  product: ProductDTO,
  thumbnail: UploadedFile | undefined,
  images: Array<UploadedFile> | undefined,
): Promise<ProductDTO> {
  const url = new URL(`/admin/products/${id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...product,
      thumbnail: thumbnail ? thumbnail.url : undefined,
      images: images ? images : undefined,
    }),
  });
  if (!response.ok) throw new Error("Failed on updating product");

  return await response.json();
}

type IUseUpdateProduct = UseMutateFunction<
  ProductDTO,
  Error,
  { id: string; product: ProductDTO; toUpload: SortableImageType[] },
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
      product: ProductDTO;
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
