import { useCallback, useEffect, useRef, useState } from "react";

const useCountdown = ({ seconds = 30 }) => {
  const [countdown, setCountdown] = useState<number>(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = useCallback(
    (time: number) => {
      setCountdown(time);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [seconds]
  );

  useEffect(() => {
    startCountdown(seconds);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { countdown, restartCountdown: startCountdown };
};

export default useCountdown;
