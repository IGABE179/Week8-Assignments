import { useEffect, useState } from 'react';

const REMINDERS_KEY = 'lab-reminders';
const DEFAULT_REMINDERS = [
  'Read the Week 8 notes',
  'Push the Effects Lab to GitHub',
  'Answer the self-check questions',
];

// Extension: Reminders stored as JSON
// External system: localStorage (arrays need JSON.stringify / JSON.parse).
export default function Reminders() {
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem(REMINDERS_KEY);
      const parsed = saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
      return Array.isArray(parsed) ? parsed : DEFAULT_REMINDERS;
    } catch {
      return DEFAULT_REMINDERS;
    }
  });
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
    } catch (error) {
      console.error('Saving reminders failed:', error);
    }
  }, [reminders]);

  // Adding is a user action -> event handler, not an Effect.
  function handleSubmit(event) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    setReminders([...reminders, value]);
    setText('');
  }

  function removeReminder(index) {
    setReminders(reminders.filter((_, i) => i !== index));
  }

  return (
    <section>
      <h2>Reminders</h2>
      <form onSubmit={handleSubmit}>
        <input
          aria-label="New reminder"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {/* Derived value: calculated during render, no Effect needed. */}
      <p>{reminders.length} reminder(s)</p>
      <ul>
        {reminders.map((item, index) => (
          <li key={`${item}-${index}`}>
            {item}{' '}
            <button type="button" onClick={() => removeReminder(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}