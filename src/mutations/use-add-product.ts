import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { Product } from "src/queries/use-list-products";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

type UploadedFile = {
  url: string;
  key: string;
};

async function uploadImages(
  access_token: string | undefined,
  formData: FormData,
): Promise<Array<UploadedFile>> {
  const url = new URL("/admin/uploads", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error("Failed uploading files");

  return await response.json();
}

async function addProduct(
  access_token: string | undefined,
  newProduct: Product,
  thumbnail: UploadedFile,
  images: Array<UploadedFile>,
): Promise<Product> {
  const url = new URL("/admin/products", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ ...newProduct, thumbnail, images }),
  });
  if (!response.ok) throw new Error("Failed on creating new product");

  return await response.json();
}

type IUseAddProduct = UseMutateFunction<
  Product |  undefined,
  Error,
  { newProduct: Product; toUpload: FormData },
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
      toUpload: FormData;
    }) => {
      const uploads = await uploadImages(user?.access_token, toUpload);
      let thumbnail: UploadedFile = { url: "", key: "" };
      const images: Array<UploadedFile> = [];

      for (const image of uploads) {
        if (image.key.split("-")[0] === "thumbnail") {
          thumbnail = image;
          return;
        }
        images.push(image);
      }

      return addProduct(
        user?.access_token,
        newProduct,
        thumbnail,
        images,
      );
    },
    mutationKey: [MUTATION_KEY.add_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product] }),
    onError: () => {
      console.log("Invalid properties");
    },
  });

  return addProductMutation;
}
