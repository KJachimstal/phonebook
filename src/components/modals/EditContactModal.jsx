import React, { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactId } from 'redux/selectors';
import { updateContact } from 'redux/operations';

const EditContactModal = ({ isOpen, onCloseModal }) => {
  const contactId = useSelector(selectContactId);
  const contact = useSelector(({ contacts: { items, contactId } }) =>
    items.find(e => e.id === contactId)
  );
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setNumber(contact.number);
    }
  }, [contact]);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      updateContact({
        name,
        number,
        id: contactId,
      })
    );
    onCloseModal();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white mb-4"
                >
                  Edit contact
                </Dialog.Title>
                <div className="mt-2">
                  <form className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 text-white"
                      >
                        Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 text-white"
                      >
                        Phone
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        type="phone"
                        name="phone"
                        id="phone"
                        value={number}
                        onChange={handleNumberChange}
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className="w-full text-green-400 hover:bg-green-600 hover:text-white focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleSubmit}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className="w-full text-red-400 hover:bg-red-600 hover:text-white focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={onCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditContactModal;
