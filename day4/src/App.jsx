import { useState } from 'react';
import Counters from './components/Counters.jsx';
import SearchFocus from './components/SearchFocus.jsx';
import ScrollAndMeasure from './components/ScrollAndMeasure.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import Stopwatch from './components/Stopwatch.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import ItemList from './components/ItemList.jsx';
import CompareCount from './components/CompareCount.jsx';

function Demo({ title, description, children }) {
  return (
    <section className="demo">
      <h2>{title}</h2>
      <p className="description">{description}</p>
      {children}
    </section>
  );
}

export default function App() {
  const [showStopwatch, setShowStopwatch] = useState(true);

  return (
    <main>
      <h1>Refs Lab</h1>
      <p>Every demo uses useRef for something state cannot do, or should not do.</p>

      <Demo
        title="A · Variable vs state vs ref"
        description="Local variable: screen stays at 0. State: screen updates. Ref: records clicks silently until you show them."
      >
        <Counters />
      </Demo>

      <Demo
        title="B + F · Focus inputs"
        description="Focus a normal input, and an input inside the custom MyInput component (React 19 ref prop)."
      >
        <SearchFocus />
      </Demo>

      <Demo
        title="C · Scroll and measure"
        description="scrollIntoView() jumps to the details; getBoundingClientRect() measures the box."
      >
        <ScrollAndMeasure />
      </Demo>

      <Demo title="D · Native dialog" description="showModal() opens it; a form with method=dialog closes it.">
        <ConfirmDialog />
      </Demo>

      <Demo
        title="E · Stopwatch"
        description="The interval ID is stored in a ref. Clicking Start twice does not create two timers."
      >
        <button type="button" onClick={() => setShowStopwatch((v) => !v)}>
          {showStopwatch ? 'Unmount stopwatch' : 'Mount stopwatch'}
        </button>
        {showStopwatch && <Stopwatch />}
      </Demo>

      <Demo title="Extension · Video" description="play() and pause() are called on the video element.">
        <VideoPlayer />
      </Demo>

      <Demo title="Extension · Callback refs" description="A Map of list items, filled and cleaned by callback refs.">
        <ItemList />
      </Demo>

      <Demo title="Extension · Previous value" description="A ref remembers the last count; changes are logged.">
        <CompareCount />
      </Demo>
    </main>
  );
}