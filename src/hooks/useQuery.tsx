import { DATA_LIMIT } from "@/validation/constants";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

interface IUseQueryProps<T extends unknown[]> {
  queryKey: string;
  queryFn: () => Promise<{ data: T | null; error: Error | null }>;
}

interface IQueryResult<T> {
  data: T | null;
  error: Error | null;
  updatedAt: Date | null;
  hasMore: boolean;
  isStale: boolean;
}

const cache = new Map<string, IQueryResult<unknown>>();

function useQuery<T extends unknown[]>({
  queryKey,
  queryFn,
}: IUseQueryProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataState, setDataState] = useState<Omit<IQueryResult<T>, "isStale">>({
    data: null,
    error: null,
    hasMore: true,
    updatedAt: null,
  });

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const { data, error } = await queryFn();

      const result = {
        data,
        error,
        updatedAt: new Date(),
        hasMore: data?.length === DATA_LIMIT,
      };
      cache.set(queryKey, { ...result, isStale: false });

      setDataState(result);
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchMoreData(
    key: string,
    cb: () => Promise<{ data: T | null; error: Error | null }>,
  ) {
    setIsLoading(true);
    try {
      if (!key || !cb) return;

      const { data, error } = await cb();
      if (!data) return;

      const cached = cache.get(key) as IQueryResult<T> | undefined;

      const mergedData = cached?.data ? ([...cached.data, ...data] as T) : data;

      const result = {
        data: mergedData,
        error,
        updatedAt: new Date(),
        hasMore: data?.length === DATA_LIMIT,
      };

      cache.set(key, { ...result, isStale: false });
      setDataState(result);
    } finally {
      setIsLoading(false);
    }
  }

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
    fetchMoreData,
  };
}

export default useQuery;

// logic related to invalidate query
export function invalidateQuery(key: string) {
  const cached = cache.get(key);
  if (!cached) return;

  cache.set(key, { ...cached, isStale: true });
}
