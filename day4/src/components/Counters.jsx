import { useRef, useState } from 'react';

// Part A – 1: ordinary variable. Resets every render and never re-renders.
// This component is intentionally broken to show why a local variable fails.
function LocalVariableCounter() {
  let count = 0;
  function increase() {
    // oxlint-disable-next-line react/immutability -- deliberate bad example
    count += 1;
    console.log('Local variable is now', count);
  }
  return (
    <button type="button" onClick={increase}>
      Local variable count: {count}
    </button>
  );
}

// Part A – 2: state. Survives renders and updates the screen.
function VisibleCounter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      State count: {count}
    </button>
  );
}

// Part A – 3: ref. Survives renders but does NOT update the screen.
// We copy it into state only when we choose to show it.
function RefCounter() {
  const clicksRef = useRef(0);
  const [shown, setShown] = useState(0);

  function recordClick() {
    clicksRef.current += 1;
  }
  function showClicks() {
    setShown(clicksRef.current);
  }

  return (
    <div>
      <button type="button" onClick={recordClick}>
        Record click
      </button>
      <button type="button" onClick={showClicks}>
        Show recorded count
      </button>
      <p>Shown count: {shown}</p>
    </div>
  );
}

export default function Counters() {
  return (
    <>
      <LocalVariableCounter />
      <VisibleCounter />
      <RefCounter />
    </>
  );
}