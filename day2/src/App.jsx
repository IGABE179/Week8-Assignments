import { useState } from 'react';
import SafeTimer from './components/SafeTimer.jsx';
import WidthLabel from './components/WidthLabel.jsx';
import UserSelector from './components/UserSelector.jsx';
import RoomDemo from './components/RoomDemo.jsx';
import MessageDemo from './components/MessageDemo.jsx';

export default function App() {
  const [showWidgets, setShowWidgets] = useState(true);

  return (
    <main style={{ maxWidth: 680, margin: '30px auto', fontFamily: 'sans-serif' }}>
      <h1>Safe Effects Dashboard</h1>
      <p>Open the Console (F12): every setup log should have a matching cleanup log.</p>

      {/* Show/Hide mounts and unmounts the timer and the width listener. */}
      <button type="button" onClick={() => setShowWidgets((v) => !v)}>
        {showWidgets ? 'Hide timer and width' : 'Show timer and width'}
      </button>
      {showWidgets && (
        <>
          <SafeTimer />
          <WidthLabel />
        </>
      )}
      <hr />

      <UserSelector />
      <hr />

      <RoomDemo />
      <hr />

      <MessageDemo />
    </main>
  );
}