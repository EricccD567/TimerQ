import { useColorModeValue } from '@chakra-ui/react';

function useColorPalette() {
  const text = useColorModeValue('text.light', 'text.dark');
  const background = useColorModeValue('background.light', 'background.dark');
  const primary = useColorModeValue('primary.light', 'primary.dark');
  const secondary = useColorModeValue('secondary.light', 'secondary.dark');
  const accent = useColorModeValue('accent.light', 'accent.dark');
  const redStatus = useColorModeValue('redStatus.light', 'redStatus.dark');
  const yellowStatus = useColorModeValue(
    'yellowStatus.light',
    'yellowStatus.dark'
  );
  const greenStatus = useColorModeValue(
    'greenStatus.light',
    'greenStatus.dark'
  );

  return {
    text,
    background,
    primary,
    secondary,
    accent,
    redStatus,
    yellowStatus,
    greenStatus,
  };
}

export default useColorPalette;
