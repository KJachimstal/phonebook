import { useState } from 'react';
import { Section } from './Section';
import { ContactForm } from './ContactForm';
import { Contacts } from './Contacts';
import { FindContacts } from './FindContacts';

export const App = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = async event => {
    await setName(event.target.value);
  };

  const handleChangeNumber = async event => {
    await setNumber(event.target.value);
  };

  return (
    <div
      style={{
        fontSize: 20,
        color: '#010101',
        padding: '0 20px 0 20px',
      }}
    >
      <Section title="Phonebook">
        <ContactForm
          name={name}
          number={number}
          onNameChange={handleChangeName}
          onNumberChange={handleChangeNumber}
        />
      </Section>
      <Section title="My contacts">
        <FindContacts />
        <Contacts />
      </Section>
    </div>
  );
};
