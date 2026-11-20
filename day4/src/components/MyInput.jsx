// Part F: React 19 – a function component can receive `ref` as a prop.
// It passes the ref to the real <input>, so the parent gets the DOM node.
export default function MyInput({ ref, label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>{' '}
      <input id={id} ref={ref} {...props} />
    </div>
  );
}