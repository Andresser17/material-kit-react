import toast from "react-hot-toast";
import { Lot } from "@medusajs/types";
import { useMutation, UseMutateFunction } from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { BACKEND_URL, MUTATION_KEY } from "src/config";

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
  if (!response.ok) throw new Error("Failed on adding product to lot");

  return await response.json();
}

type IUseAddLotProducts = UseMutateFunction<
  Lot | undefined,
  Error,
  { lot_id: string; product_id: string },
  unknown
>;

export function useAddLotProduct(): [IUseAddLotProducts, boolean] {
  //const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async ({
      lot_id,
      product_id,
    }: {
      lot_id: string;
      product_id: string;
    }) => {
      return addLotProducts(user?.access_token, lot_id, product_id);
    },
    mutationKey: [MUTATION_KEY.add_lot_product],
    // onSettled: () =>
    //   queryClient.invalidateQueries({ queryKey: [QUERY_KEY.productOption] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Product added to lot successfully");
    },
  });

  return [mutate, isSuccess];
}
