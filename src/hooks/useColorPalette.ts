import { useColorModeValue } from '@chakra-ui/react';
import { ColorPalette } from '../shared.types';

export function useColorPalette(): ColorPalette {
  const text = useColorModeValue('text.900', 'text.50');
  const background = useColorModeValue('background.50', 'background.800');
  const primary = useColorModeValue('primary.600', 'primary.200');
  const secondary = useColorModeValue('secondary.100', 'secondary.700');
  const accent = useColorModeValue('accent.200', 'accent.600');
  const redStatus = useColorModeValue('redStatus.600', 'redStatus.200');
  const yellowStatus = useColorModeValue(
    'yellowStatus.600',
    'yellowStatus.200'
  );
  const greenStatus = useColorModeValue('greenStatus.600', 'greenStatus.200');

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
