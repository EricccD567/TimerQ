import { Box } from '@chakra-ui/react';
import { ColorPaletteContext } from './ColorPaletteContext';
import { useColorPalette } from './hooks';
import { HeaderBar } from './containers';

function App() {
  const colorPalette = useColorPalette();

  return (
    <Box>
      <ColorPaletteContext.Provider value={colorPalette}>
        <HeaderBar />
      </ColorPaletteContext.Provider>
    </Box>
  );
}

export default App;
