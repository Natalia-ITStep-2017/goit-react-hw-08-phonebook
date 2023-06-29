import css from "./buttons.module.css"

const PrimaryButton = ({ text, onClick }) => {
  let buttonType = '';
  onClick ? buttonType = 'button' : buttonType = 'submit'
  return (
    <button
      className={css.button}
      type={buttonType}
      onClick={onClick}
    > {text} </button>
  )
}

export default PrimaryButton