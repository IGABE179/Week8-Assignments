import { useState } from 'react';

// Returns [value, toggle, setValue].
// toggle uses an updater, so repeated fast clicks are safe.
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((previous) => !previous);
  return [value, toggle, setValue];
}