import { useEffect, useState } from 'react';

// A simulated outside message source (no server needed).
// Defined outside the component, so it is not a dependency.
const messageBus = new EventTarget();

// Subscription: subscribe in setup, unsubscribe in cleanup.
function MessageViewer() {
  const [message, setMessage] = useState('Nothing yet');

  useEffect(() => {
    function receive(event) {
      setMessage(event.detail);
    }
    console.log('Subscribe to message bus');
    messageBus.addEventListener('message', receive);
    return () => {
      console.log('Unsubscribe from message bus');
      messageBus.removeEventListener('message', receive);
    };
  }, []);

  return <p>Latest message: {message}</p>;
}

export default function MessageDemo() {
  const [count, setCount] = useState(0);

  // Sending is a user action -> event handler, not an Effect.
  function send() {
    const next = count + 1;
    setCount(next);
    messageBus.dispatchEvent(
      new CustomEvent('message', { detail: `Hello #${next} from the event bus!` }),
    );
  }

  return (
    <section>
      <h2>Subscription</h2>
      <button type="button" onClick={send}>
        Send message
      </button>
      <MessageViewer />
    </section>
  );
}