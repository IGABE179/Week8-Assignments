import { useRef } from 'react';

// Defined outside the component: constant data, not reactive.
const ITEMS = [
  { id: 'a', name: 'Apple' },
  { id: 'b', name: 'Banana' },
  { id: 'c', name: 'Cherry' },
];

// Extension: callback refs collect several DOM nodes in a Map.
export default function ItemList() {
  const itemsRef = useRef(new Map());

  function jumpTo(id) {
    itemsRef.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <div>
      {ITEMS.map((item) => (
        <button key={item.id} type="button" onClick={() => jumpTo(item.id)}>
          Jump to {item.name}
        </button>
      ))}
      <ul className="item-list">
        {ITEMS.map((item) => (
          <li
            key={item.id}
            ref={(node) => {
              if (!node) return;
              const map = itemsRef.current;
              map.set(item.id, node);
              // React 19: cleanup runs when this node is detached.
              return () => {
                map.delete(item.id);
              };
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}