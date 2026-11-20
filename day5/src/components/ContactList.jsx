import ContactCard from './ContactCard.jsx';

export default function ContactList({ contacts, onToggle }) {
  console.log('ContactList rendered');
  if (contacts.length === 0) return <p>No contacts match.</p>;
  return (
    <ul className="list">
      {contacts.map((contact) => (
        // Stable id key from the data, never Math.random() or the index.
        <ContactCard key={contact.id} contact={contact} onToggle={onToggle} />
      ))}
    </ul>
  );
}