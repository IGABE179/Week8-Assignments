import { useState } from 'react';
import RenderDetective from './RenderDetective.jsx';
import Example1Counter from './experiments/Example1Counter.jsx';
import Example2ParentChild from './experiments/Example2ParentChild.jsx';
import Example4StateDown from './experiments/Example4StateDown.jsx';
import Example6Keys from './experiments/Example6Keys.jsx';

// One experiment at a time keeps the Console logs easy to read.
const VIEWS = [
  { id: 'detective', label: 'E · Render Detective', Component: RenderDetective },
  { id: 'ex1', label: 'B · Example 1', Component: Example1Counter },
  { id: 'ex2', label: 'B · Example 2', Component: Example2ParentChild },
  { id: 'ex6', label: 'C · Example 6 (keys)', Component: Example6Keys },
  { id: 'ex4', label: 'D · Example 4A vs 4B', Component: Example4StateDown },
];

export default function App() {
  const [view, setView] = useState('detective');
  const current = VIEWS.find((v) => v.id === view);
  const Current = current.Component;

  return (
    <main>
      <h1>Week 8 · Day 5 – Rendering</h1>
      <nav aria-label="Experiments">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-pressed={view === v.id}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </nav>
      <p className="hint">Open the Console (F12). Clear it before each test.</p>
      <Current />
    </main>
  );
}