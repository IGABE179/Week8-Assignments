import { useEffect, useState } from 'react';

// (1) On/off timer
// Fixes broken snippets A (no cleanup) and C (stale closure).
export default function SafeTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    // The condition goes INSIDE the Effect (Rules of Hooks).
    if (!running) return;

    console.log('Timer setup: interval started');
    const id = setInterval(() => {
      // Updater function: reads the latest value, so no stale closure
      // and `seconds` is not needed as a dependency.
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      console.log('Timer cleanup: interval cleared');
      clearInterval(id);
    };
  }, [running]); // honest: the Effect reads `running` only

  return (
    <section>
      <h2>Timer</h2>
      <p>Seconds: {seconds}</p>
      <button type="button" onClick={() => setRunning((r) => !r)}>
        {running ? 'Pause' : 'Resume'}
      </button>
      <button type="button" onClick={() => setSeconds(0)}>
        Reset
      </button>
    </section>
  );
}