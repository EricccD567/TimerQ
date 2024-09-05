import { createContext } from 'react';

// typing here?
// default light mode
export const ColorPaletteContext = createContext({
  text: 'hsl(219, 92%, 5%)',
  background: 'hsl(228, 100%, 99%)',
  primary: 'hsl(222, 98%, 23%)',
  secondary: 'hsl(213, 68%, 84%)',
  accent: 'hsl(220, 75%, 72%)',
  redStatus: 'hsl(4, 91%, 69%)',
  yellowStatus: 'hsl(47, 97%, 45%)',
  greenStatus: 'hsl(155, 57%, 55%)',
});
