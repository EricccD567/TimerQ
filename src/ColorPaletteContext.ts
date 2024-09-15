import { createContext } from 'react';
import { ColorPalette } from './shared.types';

// Default light mode color palette.
export const ColorPaletteContext = createContext<ColorPalette>({
  text: '#06080e',
  background: '#fbfcfd',
  primary: '#0735b0',
  secondary: '#bfd6f3',
  accent: '#90b0ef',
  redStatus: '#ab1308',
  yellowStatus: '#b08a00',
  greenStatus: '#238c62',
});
