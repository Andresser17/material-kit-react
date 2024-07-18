import { Warranty } from "@medusajs/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import HTTPError from "src/utils/http-error";

import { BACKEND_URL, MUTATION_KEY, QUERY_KEY } from "src/config";
import { useUser } from "src/queries/use-user";

async function deleteWarranty(
  access_token: string | undefined,
  warranty_id: string,
): Promise<Warranty> {
  const url = new URL(`/admin/warranties/${warranty_id}`, BACKEND_URL);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new HTTPError(result.message, response);

  return result;
}

interface IUseDeleteWarrantyArgs {
  warranty_id: string;
}

export function useDeleteWarranty(): UseMutationResult<
  Warranty,
  HTTPError,
  IUseDeleteWarrantyArgs,
  unknown
> {
  const queryClient = useQueryClient();
  const { user } = useUser();

  return useMutation({
    mutationFn: async ({ warranty_id }: IUseDeleteWarrantyArgs) => {
      return deleteWarranty(user?.access_token, warranty_id);
    },
    mutationKey: [MUTATION_KEY.delete_warranty],
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.list_warranties] }),
    onError: (err) => {
      console.log(err);
      // call error pop up
      toast.error(err.message);
    },
    onSuccess() {
      // call pop up
      toast.success("Warranty deleted successfully");
    },
  });
}
