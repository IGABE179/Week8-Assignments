import { useEffect, useState } from 'react';

// Part B: Title Mirror
// External system: the browser tab title (document.title).
export default function TitleMirror() {
  const [title, setTitle] = useState('');

  // Runs after mount and every time `title` changes.
  useEffect(() => {
    document.title = title.trim() || 'Effects Lab';
  }, [title]);

  return (
    <section>
      <h2>Title Mirror</h2>
      <label>
        Tab title:{' '}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
    </section>
  );
}