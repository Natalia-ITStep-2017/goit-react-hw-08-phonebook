import { useState } from 'react';
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import css from '../components/form/form.module.css';
import { useDispatch } from "react-redux";
import { userSingUpThunk } from "../redux/auth/uathOperations";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import PrimaryButton from 'components/buttons/primaryButton';
import { toast } from 'react-hot-toast';


const Reg = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'name') { setName(value) }
    else if (name === 'email') { setEmail(value) }
    else if (name === 'password') { setPassword(value) }
  }

  const handleCreateUser = (event) => {
    event.preventDefault();
    console.log(name, password, email)
    dispatch(userSingUpThunk({ name, email, password }))
      .unwrap()
      .then(() => {
        toast.success('Sign up successfull :)  Welcome!')
        reset()
      })
      .catch(() => { toast.error('Sign up error :(') });

  }


  const reset = () => {
    setName('');
    setEmail('');
    setPassword('')
  }

  const userNameInputId = nanoid();
  const userEmailInputId = nanoid();

  return (
    <>
      <h1 className={css.title}> Sign up </h1>
      <form
        className={css.addForm}
        onSubmit={handleCreateUser}
      >
        <TextField
          required
          name="name"
          onChange={handleChange}
          id={userNameInputId}
          label="User name"
          value={name}
        />
        <TextField
          required
          name="email"
          onChange={handleChange}
          id={userEmailInputId}
          label="Email"
          value={email}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={password}
        />

        <PrimaryButton text="Sign up" />
        <Link to='/login'>Log in</Link >
      </form>
    </>
  )
}

export default Reg
