import { memo } from 'react';

// memo: skip this card when `contact` and `onToggle` are the same references.
const ContactCard = memo(function ContactCard({ contact, onToggle }) {
  console.log('ContactCard:', contact.name);
  return (
    <li className="card">
      <strong>{contact.name}</strong> — {contact.city}
      <button type="button" className="link" onClick={() => onToggle(contact.id)}>
        {contact.favorite ? '★ Saved' : '☆ Save'}
      </button>
    </li>
  );
});

export default ContactCard;