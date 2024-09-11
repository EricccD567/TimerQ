import Countdown from 'react-countdown';

export interface ColorPalette {
  text: string;
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  redStatus: string;
  yellowStatus: string;
  greenStatus: string;
}

export interface HandleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TimerData {
  readonly id: string;
  timeInput: string;
  time: Date;
}

export interface CurrentTimer {
  index: number;
  ref: Countdown | null;
  isFirst: boolean;
  isLast: boolean;
}

export interface FormattedTimerInput {
  hours: string;
  minutes: string;
  seconds: string;
}
