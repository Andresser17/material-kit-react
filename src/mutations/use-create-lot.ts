import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Lot, DraftOrder } from "@medusajs/types";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

interface CreateLotResponse {
  lot: Lot;
}

async function createLot(
  access_token: string | undefined,
  lot: Lot,
): Promise<CreateLotResponse> {
  const url = new URL("/admin/lots", BACKEND_URL);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(lot),
  });
  if (!response.ok) throw new Error("Failed on creating new lot");

  return await response.json();
}

interface UseCreateLotArgs {
  lot: Lot;
}

type IUseCreateLot = UseMutateFunction<
  CreateLotResponse | undefined,
  Error,
  UseCreateLotArgs,
  unknown
>;

export function useCreateLot(
  resetForm: UseFormReset<DraftOrder>,
): IUseCreateLot {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async ({ lot }: UseCreateLotArgs) => {
      return createLot(user?.access_token, lot);
    },
    mutationKey: [MUTATION_KEY.create_lot],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lot] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess(data) {
      // call pop up
      toast.success("Lot created successfully");
      resetForm();
      navigate(`/lots/${data.lot.id}`);
    },
  });

  return mutate;
}
