import { Warranty } from "@medusajs/types";
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
import uploadSortableImages from "./upload-sortable-images";

export interface WarrantyRequest {
  time: number;
  expiration_date: Date;
  barcodes: { type: string; description: string; value: string }[];
}

async function createWarranty(
  access_token: string | undefined,
  order_id: string,
  line_item_id: string,
  new_warranty: WarrantyRequest,
  photos: SortableImageType[] | undefined,
): Promise<Warranty> {
  const url = new URL(
    `/admin/warranties/create_warranty/${order_id}`,
    BACKEND_URL,
  );

  const newPhotos =
    photos && photos.length > 0
      ? photos?.map((photo) => ({ url: photo.url, key: photo.id }))
      : [];
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...new_warranty,
      line_item_id,
      photos: newPhotos ? newPhotos : null,
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseCreateWarrantyArgs {
  order_id: string;
  line_item_id: string;
  new_warranty: WarrantyRequest;
  toUpload: SortableImageType[];
}

export function useCreateWarranty(): UseMutationResult<
  Warranty,
  HTTPError,
  IUseCreateWarrantyArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      order_id,
      line_item_id,
      new_warranty,
      toUpload,
    }: IUseCreateWarrantyArgs) => {
      if (toUpload.length > 0) {
        const uploads = await uploadSortableImages(
          user?.access_token,
          toUpload,
        );
        return createWarranty(
          user?.access_token,
          order_id,
          line_item_id,
          new_warranty,
          uploads,
        );
      }

      return createWarranty(
        user?.access_token,
        order_id,
        line_item_id,
        new_warranty,
        undefined,
      );
    },
    mutationKey: [MUTATION_KEY.create_warranty],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_warranties] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Warranty created successfully");
    },
  });
}
