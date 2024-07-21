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
import { WarrantyRequest } from "./use-create-warranty";

async function updateWarranty(
  access_token: string | undefined,
  warranty_id: string,
  update_warranty: WarrantyRequest,
  photos: SortableImageType[] | undefined,
): Promise<Warranty> {
  const url = new URL(`/admin/warranties/${warranty_id}`, BACKEND_URL);

  const newPhotos =
    photos && photos.length > 0
      ? photos?.map((photo) => ({ url: photo.url, key: photo.id }))
      : [];
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...update_warranty,
      photos: newPhotos ? newPhotos : null,
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseUpdateWarrantyArgs {
  warranty_id: string;
  update_warranty: WarrantyRequest;
  toUpload: SortableImageType[];
}

export function useUpdateWarranty(): UseMutationResult<
  Warranty,
  HTTPError,
  IUseUpdateWarrantyArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      warranty_id,
      update_warranty,
      toUpload,
    }: IUseUpdateWarrantyArgs) => {
      if (toUpload.length > 0) {
        const uploads = await uploadSortableImages(
          user?.access_token,
          toUpload,
        );
        return updateWarranty(
          user?.access_token,
          warranty_id,
          update_warranty,
          uploads,
        );
      }

      return updateWarranty(
        user?.access_token,
        warranty_id,
        update_warranty,
        undefined,
      );
    },
    mutationKey: [MUTATION_KEY.update_warranty],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_warranties] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Warranty updated successfully");
    },
  });
}
