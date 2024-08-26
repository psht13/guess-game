import Button from "../Button/Button";
import css from "./Form.module.css";

const Form = () => {
  return (
    <form>
      <input
        type="number"
        className={css.form}
      />

      <Button
        type="button"
        className={"startButton"}>
        Try to Guess
      </Button>
    </form>
  );
};

export default Form;
