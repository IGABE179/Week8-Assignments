import { useEffect, useState } from 'react';

// Extension: Window Width
// External system: the browser "resize" event.
export default function WindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    // Remove the same function that was added.
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section>
      <h2>Window Width</h2>
      <p>Window width: {width}px</p>
    </section>
  );
}