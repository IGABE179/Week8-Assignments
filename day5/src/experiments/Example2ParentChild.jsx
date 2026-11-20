import { useState } from 'react';

function Greeting({ name }) {
  console.log('Greeting rendered');
  return <p>Hello, {name}.</p>;
}

// Example 2: a parent render calls the child again, even with the same props.
export default function Example2ParentChild() {
  const [clicks, setClicks] = useState(0);
  console.log('Parent rendered');

  return (
    <div>
      <button type="button" onClick={() => setClicks((c) => c + 1)}>
        Parent clicks: {clicks}
      </button>
      <Greeting name="Aline" />
    </div>
  );
}