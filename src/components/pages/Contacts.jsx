import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectContacts,
  selectFilter,
  selectContactsIsLoading,
  selectCurrentUser,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';

export const Contacts = () => {
  const dispatch = useDispatch();
  const [filteredContacts, setFilteredContacts] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectContactsIsLoading);

  useEffect(() => {
    dispatch(fetchContacts(currentUser.token));
  }, [dispatch, currentUser]);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, contacts]);

  if (isLoading) {
    return <h4>Loading contacts...</h4>;
  }

  if (filteredContacts.length === 0) {
    return <h4>No contacts available</h4>;
  }

  const handleDelete = contactId => {
    const contact = {
      id: contactId,
      token: currentUser.token,
    };
    dispatch(deleteContact(contact));
  };

  return (
    <ul className="contacts-list">
      {filteredContacts.map(({ name, phone, id }) => (
        <li key={id} className="contact-item">
          <span className="contact-name">{name}</span>
          <span className="contact-phone">{phone}</span>
          <button type="submit" onClick={() => handleDelete(id)} className="">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
