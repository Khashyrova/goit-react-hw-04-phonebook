import { useState, useEffect } from 'react';

import ContactForm from './ContacttForm';
import ContactList from './ContactList';
import Filter from './Filter';
export const Appa = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');
  const componentDidUpdate = prevContakts => {
    if (prevContakts !== contacts) {
      const json = JSON.stringify(contacts);
      localStorage.setItem('contacts', json);
    }
  };
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const handleAddContact = newContact => {
    setContacts([...contacts, newContact]);
    componentDidUpdate();
  };
  const handleCheckUnique = name => {
    const isExistContact = !!contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    isExistContact && alert(`${name} is already in contacts`);

    return !isExistContact;
  };

  const handleremoveContact = id =>
    setContacts(() => contacts.filter(contact => contact.id !== id));

  const handleFilterChange = filter => setFilter(filter);

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const visibleContacts = getVisibleContacts();
  return (
    <>
      <ContactForm onAdd={handleAddContact} onCheckUnique={handleCheckUnique} />
      <ContactList contacts={visibleContacts} onRemove={handleremoveContact}>
        <Filter filter={filter} onChange={handleFilterChange} />
      </ContactList>
    </>
  );
};
