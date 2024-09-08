import { createContext } from 'react';
import { ColorPalette } from './shared.types';

// Default light mode color palette.
export const ColorPaletteContext = createContext<ColorPalette>({
  text: '#06080e',
  background: '#fbfcfd',
  primary: '#01267e',
  secondary: '#bfd6f3',
  accent: '#90b0ef',
  redStatus: '#f76054',
  yellowStatus: '#e2b103',
  greenStatus: '#4bce98',
});
