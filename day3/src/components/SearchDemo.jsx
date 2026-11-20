import { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce.js';

export default function SearchDemo() {
  const [text, setText] = useState('');
  const searchTerm = useDebounce(text, 350);

  return (
    <div>
      <label>
        Search:{' '}
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <p>Typing now: {text}</p>
      <p>Search after pause: {searchTerm}</p>
    </div>
  );
}