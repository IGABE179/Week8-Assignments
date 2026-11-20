import { useState } from 'react';

function Draft({ name }) {
  const [message, setMessage] = useState('');
  return (
    <section>
      <h3>Message for {name}</h3>
      <input
        aria-label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </section>
  );
}

// Example 6: same key keeps state; a different key resets it.
export default function Example6Keys() {
  const [selected, setSelected] = useState('Aline');
  const [resetOnChange, setResetOnChange] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setSelected((name) => (name === 'Aline' ? 'Eric' : 'Aline'))}
      >
        Switch contact
      </button>
      <label className="block">
        <input
          type="checkbox"
          checked={resetOnChange}
          onChange={(e) => setResetOnChange(e.target.checked)}
        />{' '}
        Reset message on contact change
      </label>
      <Draft key={resetOnChange ? selected : 'shared'} name={selected} />
    </div>
  );
}