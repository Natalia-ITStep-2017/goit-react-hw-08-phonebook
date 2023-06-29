
import css from '../components/app.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors'

const Home = () => {

  const user = useSelector(selectUser);

  return (
    <div>
      {user && <h1 className={css.title}> Welcome {user.name} </h1>}
      <h1 className={css.title}> Phonebook </h1>

      <h2 className={css.title}> Contacts </h2>

    </div>
  )
}


export default Home



