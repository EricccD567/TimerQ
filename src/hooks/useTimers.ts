import { useState } from 'react';
import { TimerData } from '../shared.types';

interface UseTimersReturn {
  timers: TimerData[];
  addTimer: (timerData: TimerData) => void;
  editTimer: (timerId: string, newTimeInput: string, newTime: Date) => void;
  deleteTimer: (timerId: string) => void;
  resetTimers: () => void;
}

export function useTimers(): UseTimersReturn {
  const [timers, setTimers] = useState<TimerData[]>([]);

  const addTimer: (timerData: TimerData) => void = (timerData) =>
    setTimers([...timers, timerData]);

  const editTimer: (
    timerId: string,
    newTimeInput: string,
    newTime: Date
  ) => void = (timerId, newTimeInput, newTime) =>
    setTimers(
      timers.map((t) =>
        t.id === timerId ? { ...t, timeInput: newTimeInput, time: newTime } : t
      )
    );

  const deleteTimer: (timerId: string) => void = (timerId) =>
    setTimers(timers.filter((t) => t.id !== timerId));

  const resetTimers: () => void = () => setTimers([]);

  return { timers, addTimer, editTimer, deleteTimer, resetTimers };
}
