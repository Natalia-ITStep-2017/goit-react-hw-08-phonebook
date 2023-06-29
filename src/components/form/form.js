import { useState } from 'react';
import { nanoid } from "@reduxjs/toolkit";
import css from './form.module.css';
import { useDispatch } from "react-redux";
import { addContactThunk } from "../../redux/contacts/contactOperations";
import { useSelector } from "react-redux";
import { getContacts } from "../../redux/selectors";
import TextField from '@mui/material/TextField';
import PrimaryButton from '../buttons/primaryButton';
import { toast } from 'react-hot-toast';
import { logOut } from "../../redux/auth/authSlice";

const Form = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'name') { setName(value) }
    else if (name === 'number') { setNumber(value) }
  }

  const handleAddContact = (event) => {
    event.preventDefault();
    if (contacts && contacts.map(({ name }) => name.toLowerCase())
      .includes(name.toLowerCase())) {
      toast.error(`Contact with name "${name}" already exist`);
      return
    }
    dispatch(addContactThunk({ name, number })).unwrap().then(() => {
      reset()
      toast.success('Contact is added.')
    }).catch((error) => {
      if (error.message.includes('401')) {
        dispatch(logOut());
        toast.error('Your session is over. Log In again.')
      } else {
        toast.error('Some error happened :(')
      }
    });

  }

  const reset = () => {
    setName('');
    setNumber('')
  }
  const validation = {
    pattern: "^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
    title: "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  }
  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <form className={css.addForm}
      onSubmit={handleAddContact}>

      <TextField
        required
        name="name"
        onChange={handleChange}
        id={nameInputId}
        label="Name"
        inputProps={validation}
        value={name}
      />
      <TextField
        required
        name="number"
        onChange={handleChange}
        id={numberInputId}
        label="Number"
        value={number}
        pattern="^[\+]?[0-9]+(([\( \) \-][0-9])?[0-9]*)*$"
        title="Phone number may contain only numbers, round brackets, dash and spaces. For example 067 555 55 55, +38(067)55 55 555, +38-067-55-555-55"
      />
      <PrimaryButton text="Add contact" />
    </form>
  )
}

export default Form