import { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

// (3) User details with an abortable request
// Fixes broken snippet E: the old request is cancelled and can never
// update the view for a new user.
export default function UserDetails({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    // The Effect callback itself is NOT async; it must return a cleanup,
    // not a Promise. So we define an async function inside and call it.
    async function loadUser() {
      setLoading(true);
      setError('');
      setUser(null);
      try {
        const response = await fetch(`${API_URL}/${userId}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Could not load user ${userId}`);
        const data = await response.json();
        if (!controller.signal.aborted) setUser(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    console.log('Fetch setup: request for user', userId);
    loadUser();

    return () => {
      console.log('Fetch cleanup: abort request for user', userId);
      controller.abort();
    };
  }, [userId]); // honest: a new userId must start a new request

  if (loading) return <p>Loading user...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address?.city}</p>
    </div>
  );
}