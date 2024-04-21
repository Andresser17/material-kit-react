import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// utils
import * as userLocalStorage from "src/utils/user-local-storage";

import { QUERY_KEY, BACKEND_URL } from "src/config";

async function getUser(user: User | null | undefined): Promise<User | null> {
  if (!user) return null;
  const response = await fetch(`${BACKEND_URL}/admin/auth`, {
    headers: {
      "x-medusa-access-token": user.access_token,
    },
  });
  if (!response.ok) throw new Error("Failed on get user request");

  return await response.json();
}

export interface User {
  access_token: string;
  user: {
    email: string;
    id: number;
  };
}

interface IUseUser {
  user: User | null;
}

export function useUser(): IUseUser {
  const { data: user } = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: async (): Promise<User | null> => getUser(user),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: userLocalStorage.getUser,
    throwOnError: () => {
      userLocalStorage.removeUser();
      return true;
    },
  });

  useEffect(() => {
    if (!user) userLocalStorage.removeUser();
    else userLocalStorage.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
}
