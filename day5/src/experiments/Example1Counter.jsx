import { useState } from 'react';

// Example 1: trigger -> render -> commit.
export default function Example1Counter() {
  const [count, setCount] = useState(0);
  console.log('Counter rendered with:', count);

  return (
    <div>
      <p>Current value: {count}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Add one
      </button>
    </div>
  );
}