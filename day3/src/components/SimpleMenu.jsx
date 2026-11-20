import { useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside.js';

export default function SimpleMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setOpen(false));

  return (
    <div ref={menuRef} className="menu">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        Menu
      </button>
      {open && (
        <ul>
          <li>Home</li>
          <li>Settings</li>
        </ul>
      )}
    </div>
  );
}