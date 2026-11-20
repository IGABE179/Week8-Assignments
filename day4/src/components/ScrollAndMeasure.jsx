import { useEffect, useRef, useState } from 'react';

// Advanced: keep a width updated with ResizeObserver (needs cleanup).
function LiveWidth() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = boxRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      setWidth(Math.round(entries[0].contentRect.width));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={boxRef} className="live-box">
      Live width of this box: {width}px (resize the window)
    </div>
  );
}

// Part C: scroll to an element and measure an element.
export default function ScrollAndMeasure() {
  const detailsRef = useRef(null);
  const boxRef = useRef(null);
  const [measurement, setMeasurement] = useState('Not measured');

  function goToDetails() {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function measure() {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    // Displayed numbers go into state so React re-renders them.
    setMeasurement(`${Math.round(rect.width)} × ${Math.round(rect.height)} px`);
  }

  return (
    <div>
      <button type="button" onClick={goToDetails}>
        Go to details
      </button>
      <div className="long-area">Long area. Scroll through this, or use the button.</div>
      <section ref={detailsRef} className="details">
        <h3>Important details</h3>
        <div ref={boxRef} className="measure-box">
          A box to measure
        </div>
        <button type="button" onClick={measure}>
          Measure
        </button>
        <p>Size: {measurement}</p>
        <LiveWidth />
      </section>
    </div>
  );
}