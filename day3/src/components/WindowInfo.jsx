import { useWindowSize } from '../hooks/useWindowSize.js';

export default function WindowInfo() {
  const { width, height } = useWindowSize();
  return (
    <p>
      Window: {width} × {height} — {width < 640 ? 'Small' : 'Wide'} view
    </p>
  );
}