import { createAction } from '@reduxjs/toolkit';

export const setFilter = createAction('filter/setFilter', filterValue => {
  return {
    payload: filterValue,
  };
});

export const setContactId = createAction('contacts/setContactId', contactId => {
  return {
    payload: contactId,
  };
});

export const updateContactItem = createAction(
  'contacts/updateContactItem',
  contact => ({ payload: contact })
);
