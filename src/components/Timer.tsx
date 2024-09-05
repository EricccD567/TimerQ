import Countdown from 'react-countdown';

function Timer({
  time,
  a,
}: {
  time: Date;
  a: React.LegacyRef<Countdown> | undefined;
}) {
  return <Countdown date={time} autoStart={false} ref={a} />;
}

export default Timer;

// add, cross, delete, edit, lightdark, nextbutton,
// playpause, previous, reset, restart, settings, stop
// tick
