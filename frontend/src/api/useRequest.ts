import { useCallback } from 'react';
import { ApiResponse, sendRequest } from './sendRequest';

export function useRequest<Inp, Res>(
  path: string,
  onError: (e: string) => void,
  method: 'get' | 'post' = 'post',
  setLoading?: (loading: boolean) => void
) {
  const request = useCallback(async (input?: Inp): Promise<ApiResponse<Res>> => {
    setLoading?.(true);
    const result = await sendRequest<Res, Inp>(path, method, input);
    setLoading?.(false);
    if (!result.succeeded) onError(result.err ?? 'Internal Server Error');
    return result;
  }, []);
  return request;
}