import { useEffect, useRef, useState } from 'react';

// Part E: the interval ID lives in a ref (not shown on screen);
// the seconds live in state (shown on screen).
export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  function start() {
    // Guard: a second Start click must not create a second interval.
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  }

  function stop() {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function reset() {
    stop();
    setSeconds(0);
  }

  // Cleanup on unmount: stop any running interval.
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button type="button" onClick={start}>
        Start
      </button>
      <button type="button" onClick={stop}>
        Stop
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}