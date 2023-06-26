import { ContactForm } from 'components/forms/ContactForm';
import { FindContacts } from 'components/forms/FindContactsForm';
import { Section } from 'components/helpers/Section';
import React from 'react';
import { Contacts } from './Contacts';

const Phonebook = () => {
  return (
    <div className="bg-gray-900">
      <Section title="Add new contact">
        <ContactForm />
      </Section>
      <FindContacts />
      <Contacts />
    </div>
  );
};

export default Phonebook;
