import { useState } from 'react';

interface UseCurrentTimerIndexReturn {
  currentTimerIndex: number;
  incrementCurrentTimerIndex: () => void;
  decrementCurrentTimerIndex: () => void;
  restartCurrentTimerIndex: () => void;
  resetCurrentTimerIndex: () => void;
}

export function useCurrentTimerIndex(
  timersCount: number
): UseCurrentTimerIndexReturn {
  const [currentTimerIndex, setCurrentTimerIndex] = useState<number>(-1);

  const incrementCurrentTimerIndex: () => void = () =>
    currentTimerIndex < timersCount - 1 && setCurrentTimerIndex((c) => c + 1);

  const decrementCurrentTimerIndex: () => void = () =>
    currentTimerIndex > 0 && setCurrentTimerIndex((c) => c - 1);

  const restartCurrentTimerIndex: () => void = () => setCurrentTimerIndex(0);

  const resetCurrentTimerIndex: () => void = () => setCurrentTimerIndex(-1);

  return {
    currentTimerIndex,
    incrementCurrentTimerIndex,
    decrementCurrentTimerIndex,
    restartCurrentTimerIndex,
    resetCurrentTimerIndex,
  };
}
