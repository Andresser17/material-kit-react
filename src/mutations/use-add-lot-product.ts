import toast from "react-hot-toast";
import { Lot } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

async function addLotProducts(
  access_token: string | undefined,
  lot_id: string,
  product_id: string,
): Promise<Lot> {
  const url = new URL(`/admin/lots/${lot_id}/product`, BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      product_id,
    }),
  });
  if (!response.ok)
    throw new HTTPError("Failed on adding product to lot", response);

  return await response.json();
}

interface MutateFunctionVars {
  lot_id: string;
  product_id: string;
  onSuccess?: () => void;
}

type IUseAddLotProducts = UseMutateFunction<
  Lot | undefined,
  Error,
  MutateFunctionVars,
  unknown
>;

export function useAddLotProduct(): [IUseAddLotProducts, boolean] {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({ lot_id, product_id }: MutateFunctionVars) => {
      return addLotProducts(user?.access_token, lot_id, product_id);
    },
    mutationKey: [MUTATION_KEY.add_lot_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.get_lot] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess(_result, variables) {
      // call pop up
      toast.success("Product added to lot successfully");
      if (variables.onSuccess) variables.onSuccess();
    },
  });

  return [mutate, isSuccess];
}
