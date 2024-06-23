import { Lot } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

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

export function useUpdateLot(): UseMutationResult<
  UpdateLotResponse,
  HTTPError,
  useUpdateLotArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
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
}
