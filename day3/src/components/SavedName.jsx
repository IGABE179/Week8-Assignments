import { useLocalStorage } from '../hooks/useLocalStorage.js';

export default function SavedName() {
  const [name, setName] = useLocalStorage('saved-name', '');

  return (
    <div>
      <label>
        Name:{' '}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <p>Hello, {name || 'visitor'}!</p>
    </div>
  );
}