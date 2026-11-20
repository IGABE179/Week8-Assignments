import { useState } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

// Only this component sets the tab title, so nothing competes for it.
export default function ScorePage() {
  const [score, setScore] = useState(0);
  useDocumentTitle(`Score: ${score}`);

  return (
    <button type="button" onClick={() => setScore((s) => s + 1)}>
      Score: {score}
    </button>
  );
}