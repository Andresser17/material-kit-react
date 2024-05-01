import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY, BACKEND_URL } from "src/config";

import { useUser } from "./use-user";

async function listCollections({
  access_token,
}: {
  access_token: string;
}): Promise<IListCollections | null> {
  const url = new URL(`/admin/collections`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get product types request");

  return await response.json();
}

export type Collection = {
  inputValue: string;
  id: string;
  title: string;
  handle: string;
  metadata: {
    [key: string]: unknown;
  };
};

interface IListCollections {
  collections: Collection[];
}

export function useListCollections(): IListCollections {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.collection, user?.access_token],
    queryFn: async ({ queryKey }): Promise<IListCollections | null> =>
      listCollections({
        access_token: queryKey[1] as string,
      }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    throwOnError: (error) => {
      console.log(error);
      return false;
    },
  });

  // useMutationState({
  //   filters: { mutationKey: [MUTATION_KEY], status: "pending" },
  //   // select: (mutation) => mutation.state.variables,
  // });

  return {
    collections: data?.collections ?? [],
  };
}
