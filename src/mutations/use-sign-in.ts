import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  UseMutateFunction,
} from "@tanstack/react-query";

import HTTPError from "src/utils/http-error";

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
  if (!response.ok) throw new HTTPError("Failed on sign in request", response);

  return await response.json();
}

interface useSignInParams {
  email: string;
  password: string;
}

type IUseSignIn = UseMutateFunction<User, Error, useSignInParams, unknown>;

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: useSignInParams) =>
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

  return mutate;
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
