import css from "./Button.module.css";

const Button = ({ children, className, type, clicked }) => {
  return (
    <button
      onClick={clicked}
      type={type}
      className={css[className]}>
      {children}
    </button>
  );
};

export default Button;
