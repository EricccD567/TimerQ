import { useState } from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import Countdown from 'react-countdown';
import TimerSetterModal from './TimerSetterModal';
import { Timer } from '../components';
import { convertFormattedTimerInput, formatTimerInput } from '../utils';
import { FormattedTimerInput, TimerData } from '../shared.types';

interface TimersListProps {
  timers: TimerData[];
  editTimer: (timerId: string, newTimeInput: string, newTime: Date) => void;
  deleteTimer: (timerId: string) => void;
  timersRef: (Countdown | null)[];
  currentTimerIndex: number;
  incrementCurrentTimerIndex: () => void;
  decrementCurrentTimerIndex: () => void;
  resetCurrentTimerIndex: () => void;
  isPlaying: boolean;
  onPause: () => void;
  currentTimerId: string;
  firstTimerId: string;
  lastTimerId: string;
}

function TimersList({
  timers,
  editTimer,
  timersRef,
  ...props
}: TimersListProps) {
  const [selectedTimerId, setSelectedTimerId] = useState<string>('');
  const initialTimerInput = timers.find(
    (t) => t.id === selectedTimerId
  )?.timeInput;

  const {
    isOpen: isTimerSetterOpen,
    onOpen: onTimerSetterOpen,
    onClose: onTimerSetterClose,
  } = useDisclosure();

  const handleEditSuccess: (timerInput: string) => void = (timerInput) => {
    const formattedTimerInput: FormattedTimerInput =
      formatTimerInput(timerInput);
    const time: Date = convertFormattedTimerInput(formattedTimerInput);

    editTimer(selectedTimerId, timerInput, time);
  };

  return (
    // fix gap
    <>
      <Flex grow="1" direction="column" align="center" gap="8" py="6">
        {timers.map((t, i) => (
          <Timer
            key={t.id}
            id={t.id}
            index={i}
            time={t.time}
            timerRef={(el) => (timersRef[i] = el)}
            deleteTimer={props.deleteTimer}
            currentTimerIndex={props.currentTimerIndex}
            incrementCurrentTimerIndex={props.incrementCurrentTimerIndex}
            decrementCurrentTimerIndex={props.decrementCurrentTimerIndex}
            resetCurrentTimerIndex={props.resetCurrentTimerIndex}
            isPlaying={props.isPlaying}
            onPause={props.onPause}
            currentTimerId={props.currentTimerId}
            firstTimerId={props.firstTimerId}
            lastTimerId={props.lastTimerId}
            setSelectedTimerId={(id) => setSelectedTimerId(id)}
            onTimerSetterOpen={onTimerSetterOpen}
          />
        ))}
      </Flex>
      <TimerSetterModal
        action="edit"
        defaultValue={initialTimerInput ?? ''}
        onSuccess={handleEditSuccess}
        isOpen={isTimerSetterOpen}
        onClose={onTimerSetterClose}
      />
    </>
  );
}

export default TimersList;
