import { useEffect, useState } from 'react';
import TitleMirror from './components/TitleMirror.jsx';
import SavedNote from './components/SavedNote.jsx';
import LiveClock from './components/LiveClock.jsx';
import WindowWidth from './components/WindowWidth.jsx';
import Reminders from './components/Reminders.jsx';

export default function App() {
  const [showClock, setShowClock] = useState(true);
  // Unrelated state for required test 5.
  const [clicks, setClicks] = useState(0);

  // Effect A: no array -> runs after every committed render.
  useEffect(() => {
    console.log('A: App rendered');
  });

  // Effect B: [] -> runs on mount only.
  useEffect(() => {
    console.log('B: App mounted');
  }, []);

  // Effect C: [showClock] -> runs on mount and when showClock changes.
  useEffect(() => {
    console.log('C: showClock changed to', showClock);
  }, [showClock]);

  return (
    <main style={{ maxWidth: 640, margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h1>Effects Lab</h1>
      <p>Small widgets that each sync with something outside React.</p>

      <TitleMirror />
      <hr />

      <SavedNote />
      <hr />

      <section>
        <h2>Live Clock</h2>
        <button type="button" onClick={() => setShowClock((v) => !v)}>
          {showClock ? 'Hide clock' : 'Show clock'}
        </button>
        {showClock && <LiveClock />}
      </section>
      <hr />

      <section>
        <h2>Unrelated state (test 5)</h2>
        <button type="button" onClick={() => setClicks((c) => c + 1)}>
          Clicked {clicks} times
        </button>
        <p>Watch the Console: only Effect A should log when you click this.</p>
      </section>
      <hr />

      <WindowWidth />
      <hr />

      <Reminders />
    </main>
  );
}