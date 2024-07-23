import { Barcode } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { BarcodeType } from "src/enums";
import { useUser } from "src/queries/use-user";

export interface BarcodeRequest {
  type: BarcodeType;
  value: string;
  description: string;
}

async function createBarcode(
  access_token: string | undefined,
  warranty_id: string,
  new_barcode: BarcodeRequest,
): Promise<Barcode> {
  const url = new URL(`/admin/barcodes`, BACKEND_URL);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...new_barcode,
      warranty_id,
    }),
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseCreateBarcodeArgs {
  warranty_id: string;
  new_barcode: BarcodeRequest;
}

export function useCreateBarcode(): UseMutationResult<
  Barcode,
  HTTPError,
  IUseCreateBarcodeArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ warranty_id, new_barcode }: IUseCreateBarcodeArgs) => {
      return createBarcode(user?.access_token, warranty_id, new_barcode);
    },
    mutationKey: [MUTATION_KEY.create_barcode],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_barcodes] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Barcode created successfully");
    },
  });
}
