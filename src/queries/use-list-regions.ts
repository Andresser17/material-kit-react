import { Region } from "@medusajs/types";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, QUERY_KEY } from "src/config";

import { useUser } from "./use-user";

export interface ListRegionsResponse {
  regions: Region[];
  count: number;
  offset: number;
  limit: number;
}

async function getRegions(access_token: string): Promise<ListRegionsResponse> {
  const url = new URL(`/admin/regions`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

export function useListRegions(): UseQueryResult<
  ListRegionsResponse,
  HTTPError
> {
  const { user } = useUser();

  return useQuery({
    queryKey: [QUERY_KEY.regions, user?.access_token],
    queryFn: async ({ queryKey }): Promise<ListRegionsResponse> =>
      getRegions(queryKey[1] as string),
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });
}
