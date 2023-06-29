import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectContacts,
  selectFilter,
  selectContactsIsLoading,
} from 'redux/selectors';
import { fetchContacts, deleteContact } from 'redux/operations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notiflix from 'notiflix';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditContactModal from 'components/modals/EditContactModal';
import { setContactId } from 'redux/actions';

export const Contacts = () => {
  const dispatch = useDispatch();
  const [filteredContacts, setFilteredContacts] = useState([]);
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectContactsIsLoading);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
    };
    dispatch(deleteContact(contact));
    Notiflix.Notify.success('Contact was deleted');
  };

  const handleEdit = contactId => {
    dispatch(setContactId(contactId));
    handleOpenModal();
  };

  return (
    <>
      <ul className="grid grid-cols-12 gap-4 container mx-auto mb-24">
        {filteredContacts.map(({ name, number, id }) => (
          <li
            key={id}
            className="col-span-3 p-6 pr-10 border border-gray-700 rounded-lg shadow bg-gray-700 border-gray-700 relative"
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
              {name}
            </h5>
            <p className="font-normal text-gray-400 text-xl">{number}</p>
            <button
              type="submit"
              onClick={() => handleDelete(id)}
              className="focus:outline-none text-gray-400 hover:text-red-500 hover:bg-gray-800 font-medium rounded-lg text-sm px-2 py-1 focus:ring-red-900 absolute top-2 right-2"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button
              type="submit"
              onClick={() => handleEdit(id)}
              className="focus:outline-none text-gray-400 hover:text-white hover:bg-gray-800  font-medium rounded-lg text-sm px-2 py-1 focus:ring-gray-900 absolute top-10 right-2"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          </li>
        ))}
      </ul>
      <EditContactModal {...{ isOpen, onCloseModal: handleCloseModal }} />
    </>
  );
};
