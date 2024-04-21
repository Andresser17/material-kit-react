import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import { User } from "src/queries/use-user";
import { QUERY_KEY, BACKEND_URL } from "src/config";

async function signIn(email: string, password: string): Promise<User> {
  const response = await fetch(`${BACKEND_URL}/admin/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
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

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  const { mutate: signInMutation } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data);
      navigate("/");
    },
    onError: () => {
      console.log("Invalid email or password");
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
