import { useState } from 'react';

function StudentList({ label }) {
  console.log(`StudentList rendered (${label})`);
  return (
    <ul>
      <li>Aline</li>
      <li>Eric</li>
      <li>Grace</li>
    </ul>
  );
}

// 4A: the state is too high; every click renders StudentList too.
function Version4A() {
  const [count, setCount] = useState(0);
  return (
    <div className="half">
      <h3>4A · State too high</h3>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Counter: {count}
      </button>
      <StudentList label="4A" />
    </div>
  );
}

// 4B: the state moved down into Counter; StudentList is not called.
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      Counter: {count}
    </button>
  );
}

function Version4B() {
  return (
    <div className="half">
      <h3>4B · State moved down</h3>
      <Counter />
      <StudentList label="4B" />
    </div>
  );
}

export default function Example4StateDown() {
  return (
    <div className="row">
      <Version4A />
      <Version4B />
    </div>
  );
}