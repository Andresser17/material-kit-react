import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY, BACKEND_URL } from "src/config";

import { useUser } from "./use-user";

async function listProductTypes({
  access_token,
}: {
  access_token: string;
}): Promise<ProductTypesList | null> {
  const url = new URL(`/admin/products/types`, BACKEND_URL);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on get product types request");

  return await response.json();
}

export type ProductType = {
  inputValue: string;
  id: string;
  value: string;
  metadata: string;
};

interface ProductTypesList {
  types: ProductType[];
}

export function useListProductTypes(): ProductTypesList {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: [QUERY_KEY.productType, user?.access_token],
    queryFn: async ({ queryKey }): Promise<ProductTypesList | null> =>
      listProductTypes({
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
    types: data?.types ?? [],
  };
}
