import ContactItem from './contactItem'
import css from './contact.module.css';
import { getFilteredContacts } from "../../redux/selectors";
import { useSelector } from "react-redux";

const ContactList = () => {
  const contacts = useSelector(getFilteredContacts);

  return (
    <>
      {contacts && contacts.length !== 0 ?
        (
          <ul className={css.contact__list}>
            {contacts.map((contact) => {
              return (<ContactItem
                key={contact.id}
                item={contact} />)
            })}
          </ul>)
        : (
          <p className={css.message}>No contacts</p>
        )
      }
    </>)
}

export default ContactList 