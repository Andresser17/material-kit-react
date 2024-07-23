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
import { BarcodeRequest } from "./use-create-barcode";

async function updateBarcode(
  access_token: string | undefined,
  barcode_id: string,
  update_barcode: BarcodeRequest,
): Promise<Barcode> {
  const url = new URL(`/admin/barcodes/${barcode_id}`, BACKEND_URL);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(update_barcode),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseUpdateBarcodeArgs {
  barcode_id: string;
  update_barcode: BarcodeRequest;
}

export function useUpdateBarcode(): UseMutationResult<
  Barcode,
  HTTPError,
  IUseUpdateBarcodeArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({
      barcode_id,
      update_barcode,
    }: IUseUpdateBarcodeArgs) => {
      return updateBarcode(user?.access_token, barcode_id, update_barcode);
    },
    mutationKey: [MUTATION_KEY.update_barcode],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_barcodes] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Barcode updated successfully");
    },
  });
}
