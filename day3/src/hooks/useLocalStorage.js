import { useEffect, useState } from 'react';

// Returns [value, setValue]. The value is saved as JSON under `key`.
export function useLocalStorage(key, initialValue) {
  // Lazy initialiser: read storage once, when the state is created.
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  // Write every time the key or value changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable or full in this browser.
    }
  }, [key, value]);

  return [value, setValue];
}