import toast from "react-hot-toast";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { useUser } from "src/queries/use-user";
import { useAppDispatch } from "src/redux/hooks";
import { setCallAction } from "src/redux/slices/confirm-action";
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
  if (!response.ok) throw new Error("Failed on deleted product");

  return await response.json();
}

interface UseDeleteProductParams {
  id: string;
}

type IUseDeleteProduct = UseMutateFunction<
  DeleteProductRes,
  Error,
  UseDeleteProductParams,
  unknown
>;

export function useDeleteProduct(): IUseDeleteProduct {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate } = useMutation({
    mutationFn: ({ id }: UseDeleteProductParams) =>
      deleteProduct(user?.access_token ?? "", id),
    mutationKey: [MUTATION_KEY.delete_product],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_products] }),
    onSuccess: () => {
      toast.success("Product deleted sucessfully");
      dispatch(setCallAction(false));
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return mutate;
}
