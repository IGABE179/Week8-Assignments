import { useEffect, useState } from 'react';

// Returns true while `targetKey` is held down.
export function useKeyPress(targetKey) {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const matches = (event) =>
      event.key.toLowerCase() === targetKey.toLowerCase();
    const down = (event) => {
      if (matches(event)) setPressed(true);
    };
    const up = (event) => {
      if (matches(event)) setPressed(false);
    };
    // If the window loses focus while the key is held, reset.
    const reset = () => setPressed(false);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', reset);
    };
  }, [targetKey]);

  return pressed;
}