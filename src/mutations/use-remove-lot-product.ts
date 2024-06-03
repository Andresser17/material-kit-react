import toast from "react-hot-toast";
import { Lot } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

async function removeLotProduct(
  access_token: string | undefined,
  lot_id: string,
  product_id: string,
): Promise<Lot> {
  const url = new URL(`/admin/lots/${lot_id}/product`, BACKEND_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      product_id,
    }),
  });
  if (!response.ok) throw new Error("Failed on removing product from lot");

  return await response.json();
}

type IUseAddLotProducts = UseMutateFunction<
  Lot | undefined,
  Error,
  { lot_id: string; product_id: string },
  unknown
>;

export function useRemoveLotProduct(): [IUseAddLotProducts, boolean] {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({
      lot_id,
      product_id,
    }: {
      lot_id: string;
      product_id: string;
    }) => {
      return removeLotProduct(user?.access_token, lot_id, product_id);
    },
    mutationKey: [MUTATION_KEY.remove_lot_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.get_lot] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product removed from lot successfully");
    },
  });

  return [mutate, isSuccess];
}
