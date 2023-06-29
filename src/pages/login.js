import { useState } from 'react';
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import css from '../components/form/form.module.css';
import { useDispatch } from "react-redux";
import { userLogInThunk } from "../redux/auth/uathOperations";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import PrimaryButton from 'components/buttons/primaryButton';
import { toast } from 'react-hot-toast';


const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const notify = () => toast('Here is your toast.');

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'email') { setEmail(value) }
    else if (name === 'password') { setPassword(value) }
  }

  const handleLoginUser = (event) => {
    event.preventDefault();
    dispatch(userLogInThunk({ email, password }))
      .unwrap()
      .then(() => {
        toast.success('Welcome! ;)')
        reset()
      })
      .catch(() => { toast.error('Login error :(') });

  }

  const reset = () => {
    setEmail('');
    setPassword('')
  }

  const userEmailInputId = nanoid();

  return (
    <>
      <h1 className={css.title}> Log in </h1>
      <form
        className={css.addForm}
        onSubmit={handleLoginUser}
      >
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

        <PrimaryButton text="Log in" />
        <Link to='/reg'>Sing up</Link >
      </form>
    </>
  )
}

export default Login
