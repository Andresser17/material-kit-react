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

interface UpdateLotResponse {
  lot: Lot;
}

async function updateLot(
  access_token: string | undefined,
  lot_id: string,
  lot: Lot,
): Promise<UpdateLotResponse> {
  const url = new URL(`/admin/lots/${lot_id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(lot),
  });
  if (!response.ok) throw new HTTPError("Failed on updating lot", response);

  return await response.json();
}

interface useUpdateLotArgs {
  lot_id: string;
  lot: Lot;
}

type IUseUpdateLot = UseMutateFunction<
  UpdateLotResponse | undefined,
  Error,
  useUpdateLotArgs,
  unknown
>;

export function useUpdateLot(): IUseUpdateLot {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: async ({ lot_id, lot }: useUpdateLotArgs) => {
      return updateLot(user?.access_token, lot_id, lot);
    },
    mutationKey: [MUTATION_KEY.update_lot],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.get_lot] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Lot updated successfully");
    },
  });

  return mutate;
}
