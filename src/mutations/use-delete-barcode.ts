import { Barcode } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function deleteBarcode(
  access_token: string | undefined,
  barcode_id: string,
): Promise<Barcode> {
  const url = new URL(`/admin/barcodes/${barcode_id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseDeleteBarcodeArgs {
  barcode_id: string;
}

export function useDeleteBarcode(): UseMutationResult<
  Barcode,
  HTTPError,
  IUseDeleteBarcodeArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ barcode_id }: IUseDeleteBarcodeArgs) => {
      return deleteBarcode(user?.access_token, barcode_id);
    },
    mutationKey: [MUTATION_KEY.delete_barcode],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_barcodes] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Barcode deleted successfully");
    },
  });
}
