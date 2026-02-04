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
  const [dataState, setDataState] = useState<IQueryResult<T>>({
    data: null,
    error: null,
    hasMore: true,
    updatedAt: null,
    isStale: false,
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
        isStale: false,
      };
      cache.set(queryKey, result);

      setDataState(result);
      setIsLoading(false);
    } catch (error) {
      console.log("Query fetchData:", error);
      setIsLoading(false);
    }
  };

  const fetchMoreData = async (
    key: string,
    cb: () => Promise<{ data: T | null; error: Error | null }>,
  ) => {
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
        isStale: false,
      };

      cache.set(key, result);
      setDataState(result);
      setIsLoading(false);
    } catch (error) {
      console.log("Query fetchMoreData:", error);
      setIsLoading(false);
    }
  };

  const onDelete = async (
    key: string,
    cb: () => Promise<{ data: T | null; error: Error | null }>,
    id: string,
  ) => {
    setIsLoading(true);
    try {
      if (!key || !cb) return;

      const { error } = await cb();

      const cached = cache.get(key) as IQueryResult<T> | undefined;
      if (!cached) return;

      // if i got the error then only updating error and updatedAt
      if (error) {
        const result = {
          ...cached,
          error,
          updatedAt: new Date(),
        };

        cache.set(key, result);
        setDataState(result);
        return;
      }

      // for now i am doing type assertion - (item as { id: string }).id
      const mergedData = cached?.data
        ? (cached.data.filter(
            (item) => (item as { id: string }).id !== id,
          ) as T)
        : null;

      const result = {
        ...cached,
        data: mergedData,
        error,
        updatedAt: new Date(),
      };

      cache.set(key, result);
      setDataState(result);
      setIsLoading(false);
    } catch (error) {
      console.log("Query onDelete:", error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const cached = cache.get(queryKey) as IQueryResult<T> | undefined;

      if (!cached || cached.isStale) {
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
    onDelete,
  };
}

export default useQuery;

// logic related to invalidate query
export function invalidateQuery(keys: string[]) {
  if (keys.length === 0) return;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const cached = cache.get(key);
    if (!cached) continue;

    cache.set(key, { ...cached, isStale: true });
  }
}

export function clearQuery() {
  cache.clear();
}
