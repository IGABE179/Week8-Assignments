import { useEffect, useState } from 'react';

const NOTE_KEY = 'lab-note';

// Part C: Saved Note
// External system: browser localStorage.
export default function SavedNote() {
  // Lazy initialiser: reads localStorage once, when the state is created.
  const [note, setNote] = useState(() => {
    try {
      return localStorage.getItem(NOTE_KEY) ?? '';
    } catch {
      return '';
    }
  });

  // Save every time `note` changes.
  useEffect(() => {
    try {
      localStorage.setItem(NOTE_KEY, note);
    } catch (error) {
      console.error('Could not save note:', error);
    }
  }, [note]);

  return (
    <section>
      <h2>Saved Note</h2>
      <label>
        Saved note:
        <br />
        <textarea
          rows={4}
          cols={40}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </label>
      <br />
      {/* Extension: clearing is a user action, so it lives in the click handler.
          The Effect above then saves the empty string. */}
      <button type="button" onClick={() => setNote('')}>
        Clear saved note
      </button>
    </section>
  );
}