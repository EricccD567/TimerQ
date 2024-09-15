import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { TimerData } from '../shared.types';

export function useTimersRef(timers: TimerData[]): (Countdown | null)[] {
  const [timersRef, setTimersRef] = useState<(Countdown | null)[]>([]);

  useEffect(() => {
    setTimersRef((t) => t.slice(0, timers.length));
  }, [timers]);

  return timersRef;
}
