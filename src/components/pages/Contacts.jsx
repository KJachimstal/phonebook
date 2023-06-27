import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectContacts,
  selectFilter,
  selectContactsIsLoading,
  selectCurrentUser,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    return (
      <h4 className="p-4 text-center text-xl text-white text-bold">
        Loading contacts...
      </h4>
    );
  }

  if (filteredContacts.length === 0) {
    return (
      <h4 className="p-4 text-center text-xl text-white text-bold">
        No contacts available
      </h4>
    );
  }

  const handleDelete = contactId => {
    const contact = {
      id: contactId,
      token: currentUser.token,
    };
    dispatch(deleteContact(contact));
  };

  return (
    <ul className="flex flex-wrap justify-center gap-4 mx-20 py-6">
      {filteredContacts.map(({ name, number, id }) => (
        <li
          key={id}
          className="max-w-xs p-6 border border-gray-700 rounded-lg shadow bg-gray-700 border-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {name}
          </h5>
          <p className="mb-3 font-normal text-gray-400">{number}</p>
          <button
            type="submit"
            onClick={() => handleDelete(id)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
            <span className="ml-2">Delete contact</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
