import { FormattedTimerInput } from './shared.types';

export function capitalizeFirstLetter(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function formatTimerInput(timerInput: string): FormattedTimerInput {
  if (timerInput.length !== 6) {
    return {
      hours: '',
      minutes: '',
      seconds: '',
    };
  }
  return {
    hours: timerInput.slice(0, 2),
    minutes: timerInput.slice(2, 4),
    seconds: timerInput.slice(4, 6),
  };
}

export function convertFormattedTimerInput(
  formattedTimerInput: FormattedTimerInput
): Date {
  const time = new Date();
  time.setHours(time.getHours() + parseInt(formattedTimerInput.hours));
  time.setMinutes(time.getMinutes() + parseInt(formattedTimerInput.minutes));
  time.setSeconds(time.getSeconds() + parseInt(formattedTimerInput.seconds));
  return time;
}
