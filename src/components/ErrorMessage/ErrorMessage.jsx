import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={css.error}>Oops... Something went wrong...Try again.</div>
  );
};

export default ErrorMessage;
