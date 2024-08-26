import css from "./Button.module.css";

const Button = ({ children, className, type }) => {
  return (
    <button
      type={type}
      className={css[className]}>
      {children}
    </button>
  );
};

export default Button;
