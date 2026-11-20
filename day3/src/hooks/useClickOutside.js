import { useEffect } from 'react';

// Returns nothing. Calls `onOutside` when a pointer press starts
// outside the element that `ref` points to.
export function useClickOutside(ref, onOutside) {
  useEffect(() => {
    const handlePointerDown = (event) => {
      const node = ref.current;
      if (node && !node.contains(event.target)) {
        onOutside(event);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, onOutside]);
}