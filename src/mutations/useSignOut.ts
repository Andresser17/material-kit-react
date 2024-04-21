import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY } from "src/config";

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSignOut = useCallback(() => {
    queryClient.setQueryData([QUERY_KEY.user], null);
    navigate("/login");
  }, [navigate, queryClient]);

  return onSignOut;
}
