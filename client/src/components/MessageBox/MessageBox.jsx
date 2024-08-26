import css from "./MessageBox.module.css";

const MessageBox = ({ children }) => {
  return <div className={css.messageWrapper}>{children}</div>;
};

export default MessageBox;
