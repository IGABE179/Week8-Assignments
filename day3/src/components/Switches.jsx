import { useToggle } from '../hooks/useToggle.js';

function Switch({ title }) {
  const [on, toggle] = useToggle(false);
  return (
    <button type="button" onClick={toggle} aria-pressed={on}>
      {title}: {on ? 'ON' : 'OFF'}
    </button>
  );
}

function Note() {
  const [visible, toggle] = useToggle(false);
  return (
    <div>
      <button type="button" onClick={toggle}>
        {visible ? 'Hide' : 'Show'} note
      </button>
      {visible && <p>Remember to practise React every day.</p>}
    </div>
  );
}

// Two Switches call the same Hook but each keeps its own state.
export default function Switches() {
  return (
    <>
      <Switch title="Light" />
      <Switch title="Sound" />
      <Note />
    </>
  );
}