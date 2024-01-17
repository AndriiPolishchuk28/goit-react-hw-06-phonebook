import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const { contacts, filter } = useSelector(state => state);
  const dispatch = useDispatch();

  console.log(contacts);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addName = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const existContact = contacts.some(
      elem => elem.name.toLowerCase() === name.toLowerCase()
    );

    if (!existContact) {
      dispatch({ type: 'contact/add', payload: newContact });
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  const handleOnChange = e => {
    dispatch({ type: 'filter', payload: e.target.value });
  };

  const visibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteContact = id => {
    dispatch({ type: 'contact/delete', payload: id });
  };

  return (
    <div style={{ marginLeft: '30px' }}>
      <h1>Phonebook</h1>
      <ContactForm addHandle={addName} />
      <h2>Contacts</h2>
      <Filter onChange={handleOnChange} />
      <ContactList onDelete={deleteContact} contacts={visibleContacts()} />
    </div>
  );
};
