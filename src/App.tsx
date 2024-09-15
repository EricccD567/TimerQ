import { Flex } from '@chakra-ui/react';
import { ColorPaletteContext } from './ColorPaletteContext';
import {
  useColorPalette,
  useCurrentTimerIndex,
  usePlayPause,
  useTimers,
  useTimersRef,
} from './hooks';
import { ControlsBar, HeaderBar, TimersList } from './containers';
import { CurrentTimer } from './shared.types';

function App() {
  const colorPalette = useColorPalette();

  const { timers, addTimer, editTimer, deleteTimer, resetTimers } = useTimers();
  const timersCount: number = timers.length;

  const timersRef = useTimersRef(timers);

  const {
    currentTimerIndex,
    incrementCurrentTimerIndex,
    decrementCurrentTimerIndex,
    restartCurrentTimerIndex,
    resetCurrentTimerIndex,
  } = useCurrentTimerIndex(timersCount);

  const { isPlaying, handlePlay, handlePause } = usePlayPause();

  const currentTimer: CurrentTimer = {
    index: currentTimerIndex,
    ref: timersRef[currentTimerIndex] ?? null,
    isFirst: timersCount === 1 || currentTimerIndex <= 0,
    isLast: timersCount === 1 || currentTimerIndex === timersCount - 1,
  };

  return (
    <Flex
      direction="column"
      justify="space-between"
      minH="100svh"
      bgColor={colorPalette.background}
      color={colorPalette.text}
    >
      <ColorPaletteContext.Provider value={colorPalette}>
        <HeaderBar
          resetTimers={resetTimers}
          resetCurrentTimerIndex={resetCurrentTimerIndex}
          onPause={handlePause}
        />
        <TimersList
          timers={timers}
          timersCount={timersCount}
          editTimer={editTimer}
          deleteTimer={deleteTimer}
          timersRef={timersRef}
          currentTimerIndex={currentTimerIndex}
          incrementCurrentTimerIndex={incrementCurrentTimerIndex}
          decrementCurrentTimerIndex={decrementCurrentTimerIndex}
          resetCurrentTimerIndex={resetCurrentTimerIndex}
          isPlaying={isPlaying}
          onPause={handlePause}
        />
        <ControlsBar
          timersCount={timersCount}
          addTimer={addTimer}
          incrementCurrentTimerIndex={incrementCurrentTimerIndex}
          decrementCurrentTimerIndex={decrementCurrentTimerIndex}
          restartCurrentTimerIndex={restartCurrentTimerIndex}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          currentTimer={currentTimer}
        />
      </ColorPaletteContext.Provider>
    </Flex>
  );
}

export default App;
