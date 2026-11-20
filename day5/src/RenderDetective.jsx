import { Profiler, useCallback, useMemo, useState } from 'react';
import { startingContacts } from './data/contacts.js';
import ContactList from './components/ContactList.jsx';

// React calls this after each commit of the profiled tree.
function handleRender(id, phase, actualDuration) {
  console.log(`[Profiler] ${id} ${phase}: ${actualDuration.toFixed(2)} ms`);
}

export default function RenderDetective() {
  const [contacts, setContacts] = useState(startingContacts);
  const [query, setQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [dark, setDark] = useState(false);
  console.log('RenderDetective rendered');

  // Stable function identity: [] is honest because the updater form
  // reads the latest contacts instead of the `contacts` variable.
  const toggleFavorite = useCallback((id) => {
    setContacts((items) =>
      items.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
    );
  }, []);

  // filter() makes a new array, so sort() never mutates `contacts` state.
  const visible = useMemo(
    () =>
      contacts
        .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
        .filter((c) => !onlyFavorites || c.favorite)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [contacts, query, onlyFavorites],
  );

  return (
    <div className={dark ? 'panel dark' : 'panel'}>
      <h2>Render Detective</h2>
      <button type="button" onClick={() => setDark((v) => !v)}>
        Change theme
      </button>
      <label className="block">
        Search{' '}
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <label className="block">
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(e) => setOnlyFavorites(e.target.checked)}
        />{' '}
        Favorites only
      </label>
      <Profiler id="ContactList" onRender={handleRender}>
        <ContactList contacts={visible} onToggle={toggleFavorite} />
      </Profiler>
    </div>
  );
}