import css from './account.module.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken } from "redux/selectors";
import PrimaryButton from '../../components/buttons/primaryButton';
import { useNavigate } from "react-router-dom";
import { userLogOutThunk, getCurrentUserThunk } from "../../redux/auth/uathOperations";
import { logOut } from "../../redux/auth/authSlice";
import { setToken } from '../../api/api'
import { toast } from 'react-hot-toast';


const Account = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  const logout = () => {
    dispatch(userLogOutThunk()).unwrap().then(() => {
      toast.success('You are logged out.')
      navigate('/');
    }).catch(() => {
      dispatch(logOut())
      toast.error('You are logged out.')
    });
  }

  const user = useSelector(selectUser);

  useEffect(() => {
    if (token && !user) {
      setToken(token);
      dispatch(getCurrentUserThunk())
        .unwrap()
        .catch(() => dispatch(logOut()))
    }
  }, [token, dispatch, user])

  return (
    <>
      <h1 className={css.title}> My Account </h1>
      {user && <section
        className={css.section}
      >
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <PrimaryButton text="Logout"
          onClick={logout} />
      </section>}
    </>
  )
}

export default Account
