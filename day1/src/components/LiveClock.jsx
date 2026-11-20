import { useEffect, useState } from 'react';

// Part D: Live Clock
// External system: a browser timer (setInterval).
export default function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  // [] -> start the timer once on mount.
  useEffect(() => {
    console.log('Clock setup: interval started');
    const id = setInterval(() => setTime(new Date()), 1000);

    // Cleanup runs on unmount (Hide clock) and in the StrictMode dev test.
    return () => {
      console.log('Clock cleanup: interval cleared');
      clearInterval(id);
    };
  }, []);

  return <p>Time: {time.toLocaleTimeString()}</p>;
}