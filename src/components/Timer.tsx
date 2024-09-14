import { useContext, useEffect, useRef } from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { TbClockEdit, TbMinus, TbPlayerStopFilled } from 'react-icons/tb';
import Countdown from 'react-countdown';
import useSound from 'use-sound';
import beep from '../assets/beep.mp3';
import { ColorPaletteContext } from '../ColorPaletteContext';

interface TimerProps {
  id: string;
  index: number;
  time: Date;
  timerRef: (el: Countdown | null) => void;
  timersCount: number;
  deleteTimer: (timerId: string) => void;
  currentTimerIndex: number;
  incrementCurrentTimerIndex: () => void;
  decrementCurrentTimerIndex: () => void;
  resetCurrentTimerIndex: () => void;
  isPlaying: boolean;
  onPause: () => void;
  setSelectedTimerId: (id: string) => void;
  onTimerSetterOpen: () => void;
}

interface Formatted {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface Renderer {
  total: number;
  formatted: Formatted;
}

function Timer({
  id,
  index,
  time,
  timerRef,
  timersCount,
  deleteTimer,
  currentTimerIndex,
  incrementCurrentTimerIndex,
  decrementCurrentTimerIndex,
  resetCurrentTimerIndex,
  isPlaying,
  onPause,
  setSelectedTimerId,
  onTimerSetterOpen,
}: TimerProps) {
  const colorPalette = useContext(ColorPaletteContext);

  const thisCompRef = useRef<HTMLDivElement | null>(null);

  const thisTimerRef = useRef<Countdown | null>(null);

  const isCurrent: boolean = index === currentTimerIndex;
  const isFirst: boolean = index === 0;
  const isLast: boolean = index === timersCount - 1;
  const isBeforeCurrent: boolean = index < currentTimerIndex;
  const isAfterCurrent: boolean = index > currentTimerIndex;

  useEffect(() => {
    if (isCurrent)
      thisCompRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
  }, [isCurrent]);

  const [sound] = useSound(beep, { volume: 1 });

  const handleComplete: () => void = () => {
    sound();
    if (isLast) {
      onPause();
      return;
    }
    thisTimerRef.current?.getApi().stop();
    incrementCurrentTimerIndex();
  };

  const handleStop: () => void = () => {
    thisTimerRef.current?.getApi().stop();
    onPause();
  };

  const handleEditOpen: () => void = () => {
    setSelectedTimerId(id);
    onTimerSetterOpen();
  };

  const handleDelete: () => void = () => {
    if (currentTimerIndex === -1) {
      deleteTimer(id);
      return;
    }

    if (isFirst && isLast) {
      deleteTimer(id);
      resetCurrentTimerIndex();
      onPause();
      return;
    }

    if (isBeforeCurrent) {
      deleteTimer(id);
      decrementCurrentTimerIndex();
      return;
    }

    if (isCurrent) {
      if (isLast) {
        deleteTimer(id);
        decrementCurrentTimerIndex();
        onPause();
        return;
      } else {
        deleteTimer(id);
        onPause();
        return;
      }
    }

    if (isAfterCurrent) {
      deleteTimer(id);
      return;
    }
  };

  const renderer = ({ total, formatted }: Renderer) => {
    let currentColor = colorPalette.text;
    if (total / 1000 < 45) currentColor = colorPalette.greenStatus;
    if (total / 1000 < 30) currentColor = colorPalette.yellowStatus;
    if (total / 1000 < 15) currentColor = colorPalette.redStatus;
    return (
      <Text
        color={isCurrent ? currentColor : 'inherit'}
        fontWeight={isCurrent ? 'bold' : 'normal'}
        fontSize={['3xl', '4xl', '5xl', '6xl', '7xl', '8xl']}
        pb={['0.1rem', '0.2rem', '0.3rem', '0.4rem', '0.5rem', '0.6rem']}
        userSelect="none"
      >
        {formatted.hours}:{formatted.minutes}:{formatted.seconds}
      </Text>
    );
  };

  return (
    <Flex
      justify="center"
      align="center"
      pos="relative"
      w={['90%', '85%', '80%', '75%', '70%', '65%']}
      borderRadius={['10', null, '12.5', null, '15', null]}
      borderWidth="2px"
      borderStyle="solid"
      borderColor={colorPalette.accent}
      bgColor={isCurrent ? colorPalette.secondary : colorPalette.background}
      ref={thisCompRef}
    >
      <Countdown
        key={id}
        ref={(el) => {
          timerRef(el);
          thisTimerRef.current = el;
        }}
        date={time}
        renderer={renderer}
        onComplete={handleComplete}
        autoStart={false}
        daysInHours={true}
      />
      <Flex
        pos="absolute"
        right={['0', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.25rem']}
        gap={['0', null, '2', '4', '6', '8']}
      >
        {isCurrent && isPlaying ? (
          <IconButton
            icon={<TbPlayerStopFilled />}
            onClick={handleStop}
            aria-label="stop timer"
            colorScheme="redStatus"
            variant="ghost"
            size="md"
            fontSize={['15px', '20px', '25px', '30px', '35px', '40px']}
            isRound
          />
        ) : (
          <>
            <IconButton
              icon={<TbClockEdit />}
              onClick={handleEditOpen}
              aria-label="edit timer"
              variant="ghost"
              size="md"
              fontSize={['15px', '20px', '25px', '30px', '35px', '40px']}
              isRound
            />
            <IconButton
              icon={<TbMinus />}
              onClick={handleDelete}
              aria-label="delete timer"
              colorScheme="redStatus"
              variant="ghost"
              size="md"
              fontSize={['15px', '20px', '25px', '30px', '35px', '40px']}
              isRound
            />
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Timer;
