import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import {
  Phonebook,
  PhonebookTitle,
  PhonebookForm,
  PhonebookFormLabel,
  PhonebookFormInput,
  PhonebookFormButton,
} from './Styles.module';
const ContactForm = ({ onAdd, onCheckUnique }) => {
  const [form, setForm] = useState({
    name: '',
    number: '',
  });

  const handleChangeForm = e => {
    const { name, value } = e.target;
    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  };
  const validateForm = () => {
    if (!form.name || !form.number) {
      alert(`${form.name} is already in contacts`);
      return false;
    }
    return onCheckUnique(form.name);
  };

  const resetForm = () => {
    setForm({ name: '', number: '' });
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    const { name, number } = form;
    const isValidatedForm = validateForm();

    if (!isValidatedForm) return;
    onAdd({ id: nanoid(), name, number });
    resetForm();
  };
  return (
    <Phonebook>
      <PhonebookTitle>☎️ Phonebook</PhonebookTitle>
      <PhonebookForm onSubmit={handleFormSubmit}>
        <PhonebookFormLabel htmlFor="name">Name</PhonebookFormLabel>
        <PhonebookFormInput
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChangeForm}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <br />
        <PhonebookFormLabel htmlFor="number">Number</PhonebookFormLabel>
        <PhonebookFormInput
          type="tel"
          id="number"
          name="number"
          placeholder="Enter phone number"
          value={form.number}
          onChange={handleChangeForm}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <PhonebookFormButton type="submit" onClick={() => {}}>
          Add contact
        </PhonebookFormButton>
        <br />
      </PhonebookForm>
    </Phonebook>
  );
};

ContactForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default ContactForm;
