import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";
import { ProductDTO, ProductOptionDTO } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { SortableImageType } from "src/sections/add-product/add-images";

import uploadImages, { UploadedFile } from "./uploadImages";

async function addProduct(
  access_token: string | undefined,
  newProduct: ProductDTO,
  options: ProductOptionDTO[],
  thumbnail: UploadedFile | undefined,
  images: Array<UploadedFile> | undefined,
): Promise<ProductDTO> {
  const url = new URL("/admin/products", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...newProduct,
      options: options
        .filter((option) => option.id.split("_")[0] === "default")
        .map((option) => ({ title: option.title })),
      thumbnail: thumbnail ? thumbnail.url : undefined,
      images: images ? images : undefined,
    }),
  });
  if (!response.ok) throw new Error("Failed on creating new product");

  return await response.json();
}

type IUseAddProduct = UseMutateFunction<
  ProductDTO | undefined,
  Error,
  {
    newProduct: ProductDTO;
    options: ProductOptionDTO[];
    toUpload: SortableImageType[];
  },
  unknown
>;

export function useAddProduct(
  resetForm: UseFormReset<ProductDTO>,
): IUseAddProduct {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: addProductMutation } = useMutation({
    mutationFn: async ({
      newProduct,
      options,
      toUpload,
    }: {
      newProduct: ProductDTO;
      options: ProductOptionDTO[];
      toUpload: SortableImageType[];
    }) => {
      if (toUpload.length > 0) {
        const uploads = await uploadImages(user?.access_token, toUpload);
        const thumbnail = uploads[0];
        const images = uploads.slice(1);
        return addProduct(
          user?.access_token,
          newProduct,
          options,
          thumbnail,
          images,
        );
      }

      return addProduct(
        user?.access_token,
        newProduct,
        options,
        undefined,
        undefined,
      );
    },
    mutationKey: [MUTATION_KEY.add_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product] }),
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

  return addProductMutation;
}
