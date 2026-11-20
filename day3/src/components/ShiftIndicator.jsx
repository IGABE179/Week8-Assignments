import { useKeyPress } from '../hooks/useKeyPress.js';

export default function ShiftIndicator() {
  const shiftHeld = useKeyPress('Shift');
  return <p>{shiftHeld ? 'Shift is held' : 'Shift is not held'}</p>;
}