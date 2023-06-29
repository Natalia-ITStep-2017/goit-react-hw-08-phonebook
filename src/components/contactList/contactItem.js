import PropTypes from "prop-types";
import css from './contact.module.css';
import { useDispatch } from "react-redux";
import { deleteContactThunk } from "../../redux/contacts/contactOperations";
import { toast } from 'react-hot-toast';
import { logOut } from "../../redux/auth/authSlice";


const ContactItem = ({ item }) => {

  const { id, name, number } = item

  const dispatch = useDispatch();
  const handleDeleteContact = () => {
    dispatch(deleteContactThunk(id)).unwrap()
      .then(() => {
        toast.success('Contact is deleted.')
      }).catch((error) => {
        if (error.message.includes('401')) {
          dispatch(logOut());
          toast.error('Your session is over. Log In again.')
        } else {
          toast.error('Some error happened :(')
        }
      });
  }

  return (
    < li className={css.contact__item} >
      <span className={css.contact__name}>
        {name}:
      </span>
      <span className={css.contact__number}>
        {number}
      </span>
      <button
        type="button"
        className={css.contact__deleteBtn}
        onClick={handleDeleteContact}>
        Delete
      </button>
    </li >)
}

ContactItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired
};

export default ContactItem