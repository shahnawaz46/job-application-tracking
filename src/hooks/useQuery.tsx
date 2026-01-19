import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

interface IUseQueryProps<T> {
  queryKey: string;
  queryFn: () => Promise<{ data: T | null; error: Error | null }>;
}

interface IQueryResult<T> {
  data: T | null;
  error: Error | null;
  updatedAt: Date | null;
  isStale: boolean;
}

const cache = new Map<string, IQueryResult<unknown>>();

function useQuery<T>({ queryKey, queryFn }: IUseQueryProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataState, setDataState] = useState<Omit<IQueryResult<T>, "isStale">>({
    data: null,
    error: null,
    updatedAt: null,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await queryFn();

      const result = { data, error, updatedAt: new Date() };
      cache.set(queryKey, { ...result, isStale: false });

      setDataState(result);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const cached = cache.get(queryKey) as IQueryResult<T> | undefined;

      if (!cached) {
        fetchData();
        return;
      }

      if (cached.isStale) {
        fetchData();
        return;
      }

      setDataState(cached);
    }, [queryKey]),
  );

  return {
    isLoading,
    ...dataState,
  };
}

export default useQuery;

// logic related to invalidate query
export function invalidateQuery(key: string) {
  const cached = cache.get(key);
  if (!cached) return;

  cache.set(key, { ...cached, isStale: true });
}
