import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY, BACKEND_URL } from "src/config";

import { useUser } from "./use-user";

async function listTags({
  access_token,
}: {
  access_token: string;
}): Promise<IListTags | null> {
  const url = new URL(`/admin/products/tag-usage`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get product types request");

  return await response.json();
}

export type Tag = {
  inputValue: string;
  id: string;
  usage_count: number;
  value: string;
};

interface IListTags {
  tags: Tag[];
}

export function useListTags(): IListTags {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.tag, user?.access_token],
    queryFn: async ({ queryKey }): Promise<IListTags | null> =>
      listTags({
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
    tags: data?.tags ?? [],
  };
}
