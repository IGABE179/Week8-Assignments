import { useRef, useState } from 'react';

// Part D: a native <dialog> controlled with showModal() and close().
export default function ConfirmDialog() {
  const dialogRef = useRef(null);
  const [result, setResult] = useState('No choice yet');

  function open() {
    const dialog = dialogRef.current;
    // Do not call showModal twice on an already open dialog.
    if (dialog && !dialog.open) dialog.showModal();
  }

  return (
    <div>
      <button type="button" onClick={open}>
        Open dialog
      </button>
      <p>Result: {result}</p>
      <dialog
        ref={dialogRef}
        aria-labelledby="dialog-title"
        // `returnValue` is the value of the button that closed the form.
        onClose={() => setResult(dialogRef.current?.returnValue || 'Closed with Escape')}
      >
        <h3 id="dialog-title">Are you sure?</h3>
        <p>This is a native browser dialog. Press Escape or choose a button.</p>
        {/* method="dialog" closes the dialog when a button is clicked. */}
        <form method="dialog">
          <button value="Confirmed">Yes</button>
          <button value="Cancelled">Cancel</button>
        </form>
      </dialog>
    </div>
  );
}