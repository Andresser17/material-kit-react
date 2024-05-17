import { Region } from "@medusajs/types";
import { useQuery, useMutationState } from "@tanstack/react-query";

import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

import { useUser } from "./use-user";

interface getRegionsResponse {
  regions: Region[];
  count: number;
  offset: number;
  limit: number;
}

async function getRegions(access_token: string): Promise<getRegionsResponse> {
  const url = new URL(`/admin/regions`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get regions");

  return await response.json();
}

export function useListRegions(): getRegionsResponse {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.regions, user?.access_token],
    queryFn: async ({ queryKey }): Promise<getRegionsResponse | null> =>
      getRegions(queryKey[1] as string),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
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
    regions: data?.regions ? data.regions : [],
    count: data?.count ? data.count : 1,
    offset: data?.offset ? data.offset : 0,
    limit: data?.limit ? data.limit : 1,
  };
}
