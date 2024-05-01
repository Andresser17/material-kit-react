import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { Product } from "src/queries/use-list-products";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { SortableImageType } from "src/sections/add-product/add-images";

type UploadedFile = {
  url: string;
  key: string;
};

async function uploadImages(
  access_token: string | undefined,
  images: SortableImageType[],
): Promise<Array<UploadedFile>> {
  const body = new FormData();
  images.forEach((image) => {
    body.append("files", image.img);
  });

  const url = new URL("/admin/uploads", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body,
  });
  if (!response.ok) throw new Error("Failed uploading files");

  const { uploads } = await response.json();

  return uploads;
}

async function addProduct(
  access_token: string | undefined,
  newProduct: Product,
  thumbnail: UploadedFile | undefined,
  images: Array<UploadedFile> | undefined,
): Promise<Product> {
  const url = new URL("/admin/products", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...newProduct,
      thumbnail: thumbnail ? thumbnail.url : undefined,
      images: images ? images : undefined,
    }),
  });
  if (!response.ok) throw new Error("Failed on creating new product");

  return await response.json();
}

type IUseAddProduct = UseMutateFunction<
  Product | undefined,
  Error,
  { newProduct: Product; toUpload: SortableImageType[] },
  unknown
>;

export function useAddProduct(): IUseAddProduct {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: addProductMutation } = useMutation({
    mutationFn: async ({
      newProduct,
      toUpload,
    }: {
      newProduct: Product;
      toUpload: SortableImageType[];
    }) => {
      if (toUpload.length > 0) {
        const uploads = await uploadImages(user?.access_token, toUpload);
        const thumbnail = uploads[0];
        const images = uploads.slice(1);
        return addProduct(user?.access_token, newProduct, thumbnail, images);
      }

      return addProduct(user?.access_token, newProduct, undefined, undefined);
    },
    mutationKey: [MUTATION_KEY.add_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product] }),
    onError: (err) => {
      console.log(err);
    },
  });

  return addProductMutation;
}
