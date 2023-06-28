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
      <div className="flex items-center justify-center mt-20">
        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">
          To get access to the address book
        </p>
        <NavLink
          to="/login"
          className="mb-4 text-3xl tracking-tight font-bold md:text-4xl ml-4 text-primary-500 hover:underline"
        >
          Log in
        </NavLink>
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
