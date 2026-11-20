import { useRef } from 'react';
import MyInput from './MyInput.jsx';

// Part B: focus an input with ref.current.focus().
// Part F: focus an input that lives inside a custom component.
export default function SearchFocus() {
  const searchRef = useRef(null);
  const nameRef = useRef(null);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="search">Search</label>{' '}
        <input id="search" ref={searchRef} />
      </div>
      <button type="button" onClick={() => searchRef.current?.focus()}>
        Focus search
      </button>

      <MyInput ref={nameRef} id="full-name" label="Full name" />
      <button type="button" onClick={() => nameRef.current?.focus()}>
        Focus name
      </button>
    </form>
  );
}