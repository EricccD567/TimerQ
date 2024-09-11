import { useColorModeValue } from '@chakra-ui/react';
import { ColorPalette } from '../shared.types';

export function useColorPalette(): ColorPalette {
  const text = useColorModeValue('text.900', 'text.50');
  const background = useColorModeValue('background.50', 'background.800');
  const primary = useColorModeValue('primary.700', 'primary.200');
  const secondary = useColorModeValue('secondary.100', 'secondary.800');
  const accent = useColorModeValue('accent.200', 'accent.700');
  const redStatus = useColorModeValue('redStatus.300', 'redStatus.600');
  const yellowStatus = useColorModeValue(
    'yellowStatus.500',
    'yellowStatus.400'
  );
  const greenStatus = useColorModeValue('greenStatus.400', 'greenStatus.500');

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
