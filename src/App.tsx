import { Flex } from '@chakra-ui/react';
import { ColorPaletteContext } from './ColorPaletteContext';
import { useColorPalette } from './hooks';
import { ControlsBar, HeaderBar } from './containers';

function App() {
  const colorPalette = useColorPalette();

  return (
    <Flex
      direction="column"
      justify="space-between"
      minH="100svh"
      bgColor={colorPalette.background}
      color={colorPalette.text}
    >
      <ColorPaletteContext.Provider value={colorPalette}>
        <HeaderBar />
        <ControlsBar />
      </ColorPaletteContext.Provider>
    </Flex>
  );
}

export default App;
