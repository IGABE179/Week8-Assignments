import { useEffect, useRef, useState } from 'react';

// Extension: remember the previous value in a ref and log changes.
// The ref is read and written only inside the Effect, never during render.
export default function CompareCount() {
  const [count, setCount] = useState(0);
  const previousRef = useRef(null);

  useEffect(() => {
    if (previousRef.current !== null && previousRef.current !== count) {
      console.log(`Changed: ${previousRef.current} -> ${count}`);
    }
    previousRef.current = count;
  }, [count]);

  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Count: {count} (see Console)
    </button>
  );
}