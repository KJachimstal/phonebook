import { ContactForm } from 'components/forms/ContactForm';
import { FindContacts } from 'components/forms/FindContactsForm';
import { Section } from 'components/helpers/Section';
import React from 'react';
import { Contacts } from './Contacts';
import { useSelector } from 'react-redux';
import { selectIsSignedIn } from 'redux/selectors';
import { NavLink } from 'react-router-dom';

const Phonebook = () => {
  const isSignedIn = useSelector(selectIsSignedIn);

  if (!isSignedIn) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-center mt-20">
        <NavLink
          to="/login"
          className="mb-4 text-3xl tracking-tight font-bold md:text-4xl mr-3 text-primary-500 hover:underline"
        >
          Sign in
        </NavLink>
        <p className="text-center mb-4 text-3xl tracking-tight font-bold md:text-4xl text-gray-300 px-4 md:px-0">
          to get access to the address book
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900">
      <div className="my-8">
        <Section title="Add new contact">
          <ContactForm />
        </Section>
      </div>
      <FindContacts />
      <Contacts />
    </div>
  );
};

export default Phonebook;
