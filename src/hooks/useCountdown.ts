import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownOptions {
  seconds: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

interface UseCountdownReturn {
  remaining: number;
  progress: number; // 0–1, goes from 1 → 0
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useCountdown({
  seconds,
  onComplete,
  autoStart = false,
}: UseCountdownOptions): UseCountdownReturn {
  const [remaining, setRemaining] = useState(seconds);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stop = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    stop();
    setRemaining(seconds);
  }, [stop, seconds]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          stop();
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, stop]);

  return {
    remaining,
    progress: remaining / seconds,
    isRunning,
    start,
    stop,
    reset,
  };
}
