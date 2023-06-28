import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { useState } from 'react';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const newContact = {
      name: form.elements.name.value,
      number: form.elements.phone.value,
    };

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(newContact.name.toLowerCase())
    );

    if (filteredContacts.length !== 0) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    }

    dispatch(addContact(newContact));
    resetForm();
  };

  const handleChangeName = async event => {
    await setName(event.target.value);
  };

  const handleChangeNumber = async event => {
    await setNumber(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-12 gap-x-8">
        <div className="relative z-0 w-full group col-span-5 flex items-center">
          <input
            type="text"
            name="name"
            id="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={name}
            onChange={handleChangeName}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full group col-span-5 flex items-center">
          <input
            type="tel"
            name="phone"
            id="phone"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={number}
            onChange={handleChangeNumber}
          />
          <label
            htmlFor="number"
            className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        <div className="col-span-2 flex items-center">
          <button
            type="submit"
            className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 block"
          >
            Add contact
          </button>
        </div>
      </div>
    </form>
  );
};
