import { useCallback } from "react";
import { ApiResponse, sendRequest } from "./sendRequest";

export function useRequest<Inp, Res>(
  path: string,
  method: "get" | "post" = "post",
  onError: (e: string) => void,
  setLoading?: (loading: boolean) => void,
) {
  const request = useCallback(
    async (input?: Inp): Promise<ApiResponse<Res>> => {
      setLoading?.(true);
      const result = await sendRequest<Inp, Res>(path, method, input);
      setLoading?.(false);
      if (!result.succeeded) onError(result.err ?? "Internal Server Error");
      return result;
    },
    [path, method, onError, setLoading],
  );
  return request;
}
