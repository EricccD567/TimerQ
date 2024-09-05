import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react';
import App from './App.tsx';
import './index.css';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const colors = {
  text: {
    light: 'hsl(219, 92%, 5%)',
    dark: 'hsl(219, 92%, 95%)',
  },
  background: {
    light: 'hsl(228, 100%, 99%)',
    dark: 'hsl(228, 100%, 1%)',
  },
  primary: {
    light: 'hsl(222, 98%, 23%)',
    dark: 'hsl(222, 98%, 77%)',
  },
  secondary: {
    light: 'hsl(213, 68%, 84%)',
    dark: 'hsl(213, 68%, 16%)',
  },
  accent: {
    light: 'hsl(220, 75%, 72%)',
    dark: 'hsl(220, 75%, 28%)',
  },
  redStatus: {
    light: 'hsl(4, 91%, 69%)',
    dark: 'hsl(4, 91%, 31%)',
  },
  yellowStatus: {
    light: 'hsl(47, 97%, 45%)',
    dark: 'hsl(47, 97%, 55%)',
  },
  greenStatus: {
    light: 'hsl(155, 57%, 55%)',
    dark: 'hsl(155, 57%, 45%)',
  },
};

const theme = extendTheme({ config, colors });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </StrictMode>
);
