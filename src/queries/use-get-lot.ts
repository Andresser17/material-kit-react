import { Lot } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface GetLotResponse {
  lot: Lot | null;
}

interface IGetLot {
  lot_id: string;
}

async function getLot({
  access_token,
  lot_id,
}: IGetLot & {
  access_token: string;
}): Promise<GetLotResponse | null> {
  const url = new URL(`/admin/lots/${lot_id}`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new HTTPError("Failed on get lot by id", response);

  return await response.json();
}

export function useGetLot({ lot_id }: IGetLot): GetLotResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.get_lot, user?.access_token, lot_id],
    queryFn: async ({ queryKey }): Promise<GetLotResponse | null> =>
      getLot({
        access_token: queryKey[1] as string,
        lot_id: queryKey[2] as string,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });

  useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: "pending" },
    // select: (mutation) => mutation.state.variables,
  });

  return {
    lot: data?.lot ?? null,
  };
}
