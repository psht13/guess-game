import Button from "../Button/Button";
import css from "./Form.module.css";

const Form = ({ setNumber }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target.number.value;

    setNumber(data);
    e.target.reset();
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}>
      <input
        name="number"
        type="number"
        className={css.input}
        required
        placeholder="Enter a Number"
        max={100}
        min={0}
      />

      <Button
        type="submit"
        className={"guessButton"}>
        Try to Guess
      </Button>
    </form>
  );
};

export default Form;
