import { useCallback, useState } from "react";

const useAsyncAction = () => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const execute = useCallback(async (cb: () => Promise<void>) => {
    try {
      setIsPending(true);
      await cb();
    } finally {
      setIsPending(false);
    }
  }, []);

  return { isPending, execute };
};

export default useAsyncAction;
