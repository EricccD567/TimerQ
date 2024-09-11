import { useContext, useRef } from 'react';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { TbClockEdit, TbMinus, TbPlayerStopFilled } from 'react-icons/tb';
import Countdown from 'react-countdown';
import { ColorPaletteContext } from '../ColorPaletteContext';

interface TimerProps {
  id: string;
  time: Date;
  timerRef: (el: Countdown | null) => void;
  deleteTimer: (timerId: string) => void;
  incrementCurrentTimerIndex: () => void;
  onPause: () => void;
  currentTimerId: string;
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
  time,
  timerRef,
  deleteTimer,
  incrementCurrentTimerIndex,
  onPause,
  currentTimerId,
  setSelectedTimerId,
  onTimerSetterOpen,
}: TimerProps) {
  const colorPalette = useContext(ColorPaletteContext);

  const thisTimerRef = useRef<Countdown | null>(null);

  const isCurrent = id === currentTimerId;

  // open click set default then open
  const handleComplete: () => void = () => {};

  const renderer = ({ total, formatted }: Renderer) => {
    let currentColor = colorPalette.background;
    if (total / 1000 < 30) currentColor = colorPalette.yellowStatus;
    if (total / 1000 < 15) currentColor = colorPalette.redStatus;
    return (
      <Text
        color={isCurrent ? currentColor : 'inherit'}
        fontWeight={isCurrent ? 'semibold' : 'normal'}
        fontSize={['3xl', '4xl', '5xl', '6xl', '7xl']}
      >
        {formatted.hours}:{formatted.minutes}:{formatted.seconds}
      </Text>
    );
  };

  // TbClockEdit, TbMinus, TbPlayerStopFilled

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
      bgColor={isCurrent ? colorPalette.primary : colorPalette.background}
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
      <Flex pos="absolute" right="2.5">
        <IconButton
          icon={<TbPlayerStopFilled />}
          onClick={onTimerSetterOpen}
          aria-label="add timer"
          colorScheme="greenStatus"
          variant="outline"
          size="sm"
          fontSize="10px"
          isRound
        />
      </Flex>
    </Flex>
  );
}

export default Timer;

// onStart, onPause, onStop, onTick, onComplete
// .getApi(). start(), pause(), stop(), isPaused(), isStopped(), isCompleted()

// delete curr set cur to nxt or prev if nxt not exist
// - stop

// stop -> nothing: only show stopbtn if playing (only dependent on timer api)
// timer functionality such as color change from play pause etc is all api
// need id

// on stop -> buton is play
// oncomplete -> stop(), increment here? (only if current? not necessary?
// same idea as above built into timer not current or currplaying)
// works for autoplay setting too
