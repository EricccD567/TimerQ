import { useEffect, useState } from 'react';

interface UseControlsDisablerReturn {
  isPreviousDisabled: boolean;
  isPlayPauseDisabled: boolean;
  isNextDisabled: boolean;
  isRestartDisabled: boolean;
}

export function useControlsDisabler(
  timersCount: number,
  currentTimerIndex: number,
  isCurrentTimerFirst: boolean,
  isCurrentTimerLast: boolean
): UseControlsDisablerReturn {
  const [isPreviousDisabled, setIsPreviousDisabled] = useState<boolean>(true);
  const [isPlayPauseDisabled, setIsPlayPauseDisabled] = useState<boolean>(true);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(true);
  const [isRestartDisabled, setIsRestartDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsPreviousDisabled(false);
    setIsPlayPauseDisabled(false);
    setIsNextDisabled(false);
    setIsRestartDisabled(false);

    if (!timersCount) {
      setIsPreviousDisabled(true);
      setIsPlayPauseDisabled(true);
      setIsNextDisabled(true);
      setIsRestartDisabled(true);
    }

    if (currentTimerIndex === -1) {
      setIsPreviousDisabled(true);
      setIsNextDisabled(true);
      setIsRestartDisabled(true);
    }

    if (isCurrentTimerFirst) {
      setIsPreviousDisabled(true);
    }

    if (isCurrentTimerLast) {
      setIsNextDisabled(true);
    }
  }, [timersCount, currentTimerIndex, isCurrentTimerFirst, isCurrentTimerLast]);

  return {
    isPreviousDisabled,
    isPlayPauseDisabled,
    isNextDisabled,
    isRestartDisabled,
  };
}
