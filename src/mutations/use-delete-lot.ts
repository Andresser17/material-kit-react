import toast from "react-hot-toast";
import { Lot } from "@medusajs/types";
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

interface DeleteLotResponse {
  lot: Lot;
}

async function deleteLot(
  access_token: string | undefined,
  lot_id: string,
): Promise<DeleteLotResponse> {
  const url = new URL(`/admin/lots/${lot_id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new HTTPError("Failed on deleting lot", response);

  return await response.json();
}

interface UseCreateLotArgs {
  lot_id: string;
}

type IUseDeleteLot = UseMutateFunction<
  DeleteLotResponse | undefined,
  Error,
  UseCreateLotArgs,
  unknown
>;

export function useDeleteLot(): IUseDeleteLot {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async ({ lot_id }: UseCreateLotArgs) => {
      return deleteLot(user?.access_token, lot_id);
    },
    mutationKey: [MUTATION_KEY.delete_lot],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_lots] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Lot deleted successfully");

      navigate(`/lots`);
    },
  });

  return mutate;
}
