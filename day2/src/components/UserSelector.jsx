import { useState } from 'react';
import UserDetails from './UserDetails.jsx';

// User 999 does not exist, so it shows the Error state.
const USER_IDS = [1, 2, 3, 4, 5, 999];

export default function UserSelector() {
  const [userId, setUserId] = useState(1);

  return (
    <section>
      <h2>User selector</h2>
      <p>Click users quickly and watch the Network tab: old requests are cancelled.</p>
      {USER_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setUserId(id)}
          aria-pressed={userId === id}
        >
          User {id}
        </button>
      ))}
      <UserDetails userId={userId} />
    </section>
  );
}