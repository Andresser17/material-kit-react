import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL, MUTATION_KEY } from "src/config";

export type DeleteProductRes = {
  id: string;
  object: string;
  deleted: boolean;
};

async function deleteProduct(
  access_token: string,
  id: string,
): Promise<DeleteProductRes> {
  const url = new URL(`/admin/products/${id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) throw new Error("Failed on sign in request");

  return await response.json();
}

type IUseDeleteProduct = UseMutateFunction<
  DeleteProductRes,
  Error,
  { id: string },
  unknown
>;

export function useDeleteProduct(): IUseDeleteProduct {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteProduct(user?.access_token ?? "", id),
    mutationKey: [MUTATION_KEY.delete_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.product] }),
    // onSuccess: (data) => {
    //   // remove deleted product from cache
    //   if (data.deleted) {
    //     console.log("deleted")
    //     // queryClient.removeQueries({ queryKey: [QUERY_KEY.product] });
    //     // queryClient.setQueryData([QUERY_KEY.product, { id: data.id }], null);
    //   }
    // },
    onError: () => {
      console.log("Invalid properties");
    },
  });

  return deleteProductMutation;
}
