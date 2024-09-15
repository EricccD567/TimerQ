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

// System sets initial value.
// App subscribes to system color mode changes.
const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const colors = {
  text: {
    50: '#f1f3f9', // dark
    900: '#06080e', // light
  },
  background: {
    50: '#fbfcfd', // light
    800: '#1d262f', // dark
  },
  primary: {
    50: '#e2edff',
    100: '#b2c9ff',
    200: '#81a6fe', // dark
    300: '#5082fc',
    400: '#225efb',
    500: '#0f45e2',
    600: '#0735b0', // light
    700: '#01267e',
    800: '#00174e',
    900: '#00081e',
  },
  secondary: {
    50: '#e7f1ff',
    100: '#bfd6f3', // light
    200: '#96bbe8',
    300: '#6d9fdf',
    400: '#4784d6',
    500: '#2f6abc',
    600: '#245393',
    700: '#183b69', // dark
    800: '#0c2340',
    900: '#000c19',
  },
  accent: {
    50: '#e5efff',
    100: '#bacff8',
    200: '#90b0ef', // light
    300: '#6490e8',
    400: '#3a70e0',
    500: '#2357c7',
    600: '#19439b', // dark
    700: '#10306f',
    800: '#071d45',
    900: '#000a1b',
  },
  redStatus: {
    50: '#ffe5e3',
    100: '#ffbab4',
    200: '#fa8c84', // dark
    300: '#f76054',
    400: '#f43325',
    500: '#da1b0b',
    600: '#ab1308', // light
    700: '#7b0c05',
    800: '#4b0500',
    900: '#1f0000',
  },
  yellowStatus: {
    50: '#fff9db',
    100: '#ffeeae',
    200: '#fde27e', // dark
    300: '#fdd64d',
    400: '#fccb1d',
    500: '#e2b103',
    600: '#b08a00', // light
    700: '#7e6300',
    800: '#4c3b00',
    900: '#1c1400',
  },
  greenStatus: {
    50: '#e0fdf2',
    100: '#bdf0dc',
    200: '#98e5c5', // dark
    300: '#71d9af',
    400: '#4bce98',
    500: '#31b47e',
    600: '#238c62', // light
    700: '#156445',
    800: '#063d29',
    900: '#00160b',
  },
};

const theme = extendTheme({ config, colors });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript
        initialColorMode={config.initialColorMode}
        nonce="false"
      />
      <App />
    </ChakraProvider>
  </StrictMode>
);
