import { useState } from 'react';

interface UsePlayPauseReturn {
  isPlaying: boolean;
  handlePlay: () => void;
  handlePause: () => void;
}

export function usePlayPause(): UsePlayPauseReturn {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay: () => void = () => setIsPlaying(true);

  const handlePause: () => void = () => setIsPlaying(false);

  return { isPlaying, handlePlay, handlePause };
}
