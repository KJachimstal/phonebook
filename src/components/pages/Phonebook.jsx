import { ContactForm } from 'components/forms/ContactForm';
import { FindContacts } from 'components/forms/FindContactsForm';
import { Section } from 'components/helpers/Section';
import React from 'react';
import { Contacts } from './Contacts';

const Phonebook = () => {
  return (
    <>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="My contacts">
        <FindContacts />
        <Contacts />
      </Section>
    </>
  );
};

export default Phonebook;
