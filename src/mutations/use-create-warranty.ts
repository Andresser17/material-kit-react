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

export interface WarrantyRequest {
  time: number;
  expiration_date: Date;
  barcodes: { type: string; description: string; value: string }[];
  photos: File[];
  line_item_id: string;
}

async function createWarranty(
  access_token: string | undefined,
  order_id: string,
  new_warranty: WarrantyRequest,
): Promise<Warranty> {
  const url = new URL(
    `/admin/warranties/create_warranty/${order_id}`,
    BACKEND_URL,
  );
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(new_warranty),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseCreateWarrantyArgs {
  order_id: string;
  new_warranty: WarrantyRequest;
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
    mutationFn: async ({ order_id, new_warranty }: IUseCreateWarrantyArgs) => {
      // let uploads: UploadedFile[] = [];
      // if (new_warranty.photos.length > 0) {
      //   uploads = await uploadImages(user?.access_token, new_warranty.photos);
      // }

      return createWarranty(user?.access_token, order_id, new_warranty);
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
