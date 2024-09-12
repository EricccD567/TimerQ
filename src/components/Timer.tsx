import { useContext, useEffect, useRef } from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { TbClockEdit, TbMinus, TbPlayerStopFilled } from 'react-icons/tb';
import Countdown from 'react-countdown';
import { ColorPaletteContext } from '../ColorPaletteContext';

interface TimerProps {
  id: string;
  index: number;
  time: Date;
  timerRef: (el: Countdown | null) => void;
  deleteTimer: (timerId: string) => void;
  currentTimerIndex: number;
  incrementCurrentTimerIndex: () => void;
  decrementCurrentTimerIndex: () => void;
  resetCurrentTimerIndex: () => void;
  isPlaying: boolean;
  onPause: () => void;
  currentTimerId: string;
  firstTimerId: string;
  lastTimerId: string;
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
  deleteTimer,
  currentTimerIndex,
  incrementCurrentTimerIndex,
  decrementCurrentTimerIndex,
  resetCurrentTimerIndex,
  isPlaying,
  onPause,
  currentTimerId,
  firstTimerId,
  lastTimerId,
  setSelectedTimerId,
  onTimerSetterOpen,
}: TimerProps) {
  const colorPalette = useContext(ColorPaletteContext);

  const thisCompRef = useRef<HTMLDivElement | null>(null);

  const thisTimerRef = useRef<Countdown | null>(null);

  const isCurrent: boolean = id === currentTimerId;
  const isFirst: boolean = id === firstTimerId;
  const isLast: boolean = id === lastTimerId;
  const isBeforeCurrentTimer: boolean = index < currentTimerIndex;
  const isAfterCurrentTimer: boolean = index > currentTimerIndex;

  useEffect(() => {
    if (isCurrent)
      thisCompRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
  }, [isCurrent]);

  const handleEditOpen: () => void = () => {
    setSelectedTimerId(id);
    onTimerSetterOpen();
  };

  // TODO: autoplay next timer setting
  const handleComplete: () => void = () => {
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

    if (isBeforeCurrentTimer) {
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

    if (isAfterCurrentTimer) {
      deleteTimer(id);
      return;
    }
  };

  const renderer = ({ total, formatted }: Renderer) => {
    let currentColor = colorPalette.text;
    if (total / 1000 < 60) currentColor = colorPalette.greenStatus;
    if (total / 1000 < 30) currentColor = colorPalette.yellowStatus;
    if (total / 1000 < 15) currentColor = colorPalette.redStatus;
    return (
      <Text
        color={isCurrent ? currentColor : 'inherit'}
        fontWeight={isCurrent ? 'bold' : 'normal'}
        fontSize={['3xl', '4xl', '5xl', '6xl', '7xl', '8xl']}
        mb="2"
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
      w={['90%', '75%', '60%', '60%', '50%']}
      borderRadius="10"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={colorPalette.primary}
      bgColor={isCurrent ? colorPalette.accent : colorPalette.background}
      ref={thisCompRef}
      // scrollMarginTop="20"
    >
      <Countdown
        key={id}
        ref={(el) => {
          timerRef(el);
          thisTimerRef.current = el;
        }}
        date={time}
        daysInHours={true}
        autoStart={false}
        renderer={renderer}
        onComplete={handleComplete}
      />
      <Flex pos="absolute" right="0">
        {isCurrent && isPlaying ? (
          <IconButton
            icon={<TbPlayerStopFilled />}
            onClick={handleStop}
            aria-label="stop timer"
            colorScheme="redStatus"
            variant="ghost"
            size={['sm', null, 'md', null, 'lg', null]}
            fontSize={['20px', '20px', '25px', '25px', '35px', '35px']}
            isRound
          />
        ) : (
          <>
            <IconButton
              icon={<TbClockEdit />}
              onClick={handleEditOpen}
              aria-label="edit timer"
              variant="ghost"
              size={['sm', null, 'md', null, 'lg', null]}
              fontSize={['20px', '20px', '25px', '25px', '35px', '35px']}
              isRound
            />
            <IconButton
              icon={<TbMinus />}
              onClick={handleDelete}
              aria-label="delete timer"
              colorScheme="redStatus"
              variant="ghost"
              size={['sm', null, 'md', null, 'lg', null]}
              fontSize={['20px', '20px', '25px', '25px', '35px', '35px']}
              isRound
            />
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Timer;
