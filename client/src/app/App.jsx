import { useEffect, useState } from "react";

import Form from "../components/Form/Form";
import Button from "../components/Button/Button";
import MessageBox from "../components/MessageBox/MessageBox";

import { doGuess, doStartGame } from "../utils";
import css from "./App.module.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [number, setNumber] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (number === null) return;

    (async () => {
      const response = await doGuess(number);

      if (response) {
        changeMessage(response.message);
      }

      if (response.message === "Correct! Play again?") {
        toggleGameStatus();
      }
    })();
  }, [number]);

  const handleClick = async () => {
    changeMessage(null);
    changeNumber(null);

    const response = await doStartGame();

    if (response) {
      toggleGameStatus();
      changeMessage(response.message);
    }
  };

  const toggleGameStatus = () => {
    setIsStarted((prev) => !prev);
  };

  const changeMessage = (message) => {
    setMessage(message);
  };

  const changeNumber = (number) => {
    setNumber(number);
  };

  return (
    <div className={css.appLayout}>
      {!isStarted && (
        <Button
          type={"button"}
          clicked={handleClick}
          className={"startButton"}>
          Start Game
        </Button>
      )}

      <div className={css.wrapper}>
        {isStarted && <Form setNumber={changeNumber} />}
        {message && <MessageBox>{message}</MessageBox>}
      </div>
    </div>
  );
}

export default App;
