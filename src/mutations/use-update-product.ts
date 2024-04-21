import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { User } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL } from "src/config";

// async function delete(id: string): Promise<any> {

// }

async function updateProduct(id: string): Promise<User> {
  const response = await fetch(`${BACKEND_URL}/admin/products${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  if (!response.ok) throw new Error("Failed on sign in request");

  return await response.json();
}

type IUseSignIn = UseMutateFunction<
  User,
  Error,
  { email: string; password: string },
  unknown
>;

export function useUpdateProduct(): IUseSignIn {
  const queryClient = useQueryClient();
  // const { enqueueSnackbar } = useSnackbar();

  const { mutate: signInMutation } = useMutation({
    mutationFn: ({ id }: { id: string }) => updateProduct(id),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.product], data);
    },
    onError: () => {
      console.log("Invalid properties");
      // enqueueSnackbar("Ops.. Error on sign in. Try again!", {
      //   variant: "error",
      // });
    },
  });

  return signInMutation;
}

// function useSnackbar(): {
//   enqueueSnackbar: (
//     message: string,
//     config: {
//       variant: string;
//     },
//   ) => void;
// } {
//   throw new Error("Function not implemented.");
// }
