import { NavLink, Outlet } from "react-router-dom";
import { Suspense, useEffect } from "react";
import css from './header.module.css';
import BasicMenu from "components/userMenu";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUser } from "redux/selectors";
import { getCurrentUserThunk } from '../../redux/auth/uathOperations';
import { setToken } from '../../api/api';
import { toast } from 'react-hot-toast';
import { logOut } from "../../redux/auth/authSlice";

const Header = () => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && !user) {
      setToken(token);
      dispatch(getCurrentUserThunk())
        .unwrap()
        .catch((error) => {
          if (error.message.includes('401')) {
            dispatch(logOut());
            toast.error('Your session is over. Log In again.')
          } else {
            toast.error('Some error happened :(')
          }
        })
    }
  }, [token, dispatch, user])

  return (
    <main>
      <div className={css.headerMenu}>
        <ul className={css.headerMenuGroup}>
          <li className={css.headerMenuItem}>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li className={css.headerMenuItem}>
            <NavLink to="/phonebook" >Phonebook</NavLink>
          </li>
        </ul>
        <ul className={css.headerMenuGroup}>

          <li className={css.headerMenuItem}>
            {!token && <NavLink to="/reg" >Reg</NavLink>}
          </li>
          <li className={css.headerMenuItem}>
            {!token && <NavLink to="/login" >Login</NavLink>}
          </li>
          <li className={css.headerMenuItem}>
            {user && <BasicMenu />}
          </li>
        </ul>
      </div>
      <Suspense fallback={< div > Loading page...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};
export default Header