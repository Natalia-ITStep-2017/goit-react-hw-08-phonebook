import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsThunk } from "redux/contacts/contactOperations";
import { selectToken } from "redux/selectors";
import css from '../components/app.module.css';
import Form from '../components/form/form';
import Filter from '../components/filter/filter';
import ContactList from '../components/contactList/contactList';
import { setToken } from '../api/api';
import { toast } from 'react-hot-toast';
import { logOut } from "../redux/auth/authSlice";

const Phonebook = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);


  useEffect(() => {
    setToken(token);
    dispatch(getContactsThunk()).unwrap().catch((error) => {
      if (error.message.includes('401')) {
        dispatch(logOut());
        toast.error('Your session is over. Log In again.')
      } else {
        toast.error('Some error happened :(')
      }
    });
  }, [dispatch, token]);

  return (
    <div>
      <h1 className={css.title}> Phonebook </h1>
      <Form />
      <h2 className={css.title}> Contacts </h2>
      <Filter />
      <ContactList />
    </div>
  )
}

export default Phonebook



