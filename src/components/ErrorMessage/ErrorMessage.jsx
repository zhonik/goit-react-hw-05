import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.error}>
      Whoops, something went wrong! <br />
      Please try again your request!
    </div>
  );
};

export default ErrorMessage;
