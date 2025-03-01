import { useCallback, useState } from 'react';
const useAxios = <T extends object>(
  fun: () => Promise<T>,
  deps: readonly unknown[],
) => {
  const [reponse, setReponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const doAxios = useCallback(async () => {
    try {
      const data = await fun();
      setReponse('data' in data ? (data.data as T) : data);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : String(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
  return {
    doAxios,
    error,
    reponse,
  };
};
export default useAxios;
