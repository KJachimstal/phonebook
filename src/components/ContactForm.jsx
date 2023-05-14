import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/operations';

export const ContactForm = ({ name, number, onNameChange, onNumberChange }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts.items);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const newContact = {
      name: form.elements.name.value,
      phone: form.elements.phone.value,
    };

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(newContact.name.toLowerCase())
    );

    if (filteredContacts.length !== 0) {
      alert(`${newContact.name} is already in contacts!`);
    }

    dispatch(addContact(newContact));
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="comtainer">
      <label htmlFor="name" className="form-label">
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id="name"
          className="form-input"
          value={name}
          onChange={onNameChange}
        />
      </label>
      <label htmlFor="number" className="form-label">
        Number
        <input
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id="phone"
          className="form-input"
          value={number}
          onChange={onNumberChange}
        />
      </label>
      <button type="submit" className="form-button">
        Add contact
      </button>
    </form>
  );
};
