import { useEffect, useState } from 'react';

// (2) Live window width
// Fixes broken snippet B: add and remove the SAME function reference.
export default function WidthLabel() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    console.log('Width setup: resize listener added');
    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Width cleanup: resize listener removed');
      window.removeEventListener('resize', handleResize);
    };
  }, []); // reads no props/state; setWidth is stable

  return (
    <section>
      <h2>Window width</h2>
      <p>Width: {width}px</p>
    </section>
  );
}