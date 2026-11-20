import { useEffect, useState } from 'react';

// Round A: observe cleanup order when roomId changes.
// Also fixes broken snippet F: the options object is created INSIDE
// the Effect, so it is not a new dependency on every render.
function Room({ roomId }) {
  useEffect(() => {
    const options = { roomId, server: 'example' };
    console.log('START room', options.roomId, options);
    return () => console.log('STOP room', options.roomId);
  }, [roomId]);

  return <p>Current room: {roomId}</p>;
}

export default function RoomDemo() {
  const [roomId, setRoomId] = useState(1);
  const [typed, setTyped] = useState('');

  return (
    <section>
      <h2>Room (cleanup order)</h2>
      <button type="button" onClick={() => setRoomId((id) => id + 1)}>
        Next room
      </button>
      <Room roomId={roomId} />
      <label>
        Unrelated input (does not restart the room):{' '}
        <input value={typed} onChange={(e) => setTyped(e.target.value)} />
      </label>
    </section>
  );
}