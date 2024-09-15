import { useEffect, useState } from 'react';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import {
  TbPlayerPauseFilled,
  TbPlayerPlayFilled,
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbPlus,
  TbRotateClockwise,
} from 'react-icons/tb';
import { useControlsDisabler } from '../hooks';
import TimerSetterModal from './TimerSetterModal';
import { convertFormattedTimerInput, formatTimerInput } from '../utils';
import { CurrentTimer, FormattedTimerInput, TimerData } from '../shared.types';

interface ControlsBarProps {
  timersCount: number;
  addTimer: (timerData: TimerData) => void;
  incrementCurrentTimerIndex: () => void;
  decrementCurrentTimerIndex: () => void;
  restartCurrentTimerIndex: () => void;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  currentTimer: CurrentTimer;
}

function ControlsBar({
  timersCount,
  addTimer,
  incrementCurrentTimerIndex,
  decrementCurrentTimerIndex,
  restartCurrentTimerIndex,
  isPlaying,
  onPlay,
  onPause,
  currentTimer,
}: ControlsBarProps) {
  const {
    isOpen: isTimerSetterOpen,
    onOpen: onTimerSetterOpen,
    onClose: onTimerSetterClose,
  } = useDisclosure();

  const handleAddSuccess: (timerInput: string) => void = (timerInput) => {
    const formattedTimerInput: FormattedTimerInput =
      formatTimerInput(timerInput);
    const time: Date = convertFormattedTimerInput(formattedTimerInput);

    const timerData: TimerData = {
      id: crypto.randomUUID(),
      timeInput: timerInput,
      time,
    };
    addTimer(timerData);
  };

  const {
    isPreviousDisabled,
    isPlayPauseDisabled,
    isNextDisabled,
    isRestartDisabled,
  } = useControlsDisabler(
    timersCount,
    currentTimer.index,
    currentTimer.isFirst,
    currentTimer.isLast
  );

  const handlePreviousTimerClick: () => void = () => {
    currentTimer.ref?.getApi().stop();
    decrementCurrentTimerIndex();
  };

  const handlePlayPauseClick: () => void = () => {
    if (!isPlaying) {
      if (currentTimer.index === -1) {
        restartCurrentTimerIndex();
        onPlay();
        return;
      }
      currentTimer.ref?.getApi().start();
      onPlay();
    } else {
      currentTimer.ref?.getApi().pause();
      onPause();
    }
  };

  const handleNextTimerClick: () => void = () => {
    currentTimer.ref?.getApi().stop();
    incrementCurrentTimerIndex();
  };

  const [isRestartClicked, setIsRestartClicked] = useState<boolean>(false);
  const handleRestartTimersClick: () => void = () => {
    currentTimer.ref?.getApi().stop();
    restartCurrentTimerIndex();
    setIsRestartClicked(true);
  };

  useEffect(() => {
    if (currentTimer.index >= 0 && isPlaying) {
      currentTimer.ref?.getApi().start();
      onPlay();
    }

    if (isRestartClicked) {
      setIsRestartClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimer.index, isRestartClicked]);

  return (
    <>
      <Flex
        as="footer"
        justify="center"
        align="center"
        gap={[4, 6, 8]}
        py="6"
        pos="sticky"
        bottom="0"
        bgColor="inherit"
      >
        <IconButton
          icon={<TbPlus />}
          onClick={onTimerSetterOpen}
          aria-label="add timer"
          colorScheme="greenStatus"
          variant="outline"
          size="md"
          fontSize="25px"
          isRound
        />
        <IconButton
          icon={<TbPlayerSkipBackFilled />}
          onClick={handlePreviousTimerClick}
          aria-label="previous timer"
          colorScheme="primary"
          variant="ghost"
          size="md"
          fontSize="25px"
          isRound
          isDisabled={isPreviousDisabled}
        />
        <IconButton
          icon={isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
          onClick={handlePlayPauseClick}
          aria-label="play pause timers"
          colorScheme="primary"
          variant="solid"
          size="lg"
          fontSize="30px"
          isRound
          isDisabled={isPlayPauseDisabled}
        />
        <IconButton
          icon={<TbPlayerSkipForwardFilled />}
          onClick={handleNextTimerClick}
          aria-label="next timer"
          colorScheme="primary"
          variant="ghost"
          size="md"
          fontSize="25px"
          isRound
          isDisabled={isNextDisabled}
        />
        <IconButton
          icon={<TbRotateClockwise />}
          onClick={handleRestartTimersClick}
          aria-label="restart timers"
          colorScheme="primary"
          variant="ghost"
          size="md"
          fontSize="25px"
          isRound
          isDisabled={isRestartDisabled}
        />
      </Flex>
      <TimerSetterModal
        action="add"
        defaultValue=""
        onSuccess={handleAddSuccess}
        isOpen={isTimerSetterOpen}
        onClose={onTimerSetterClose}
      />
    </>
  );
}

export default ControlsBar;
