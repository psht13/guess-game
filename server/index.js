const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let targetNumber = null;

app.use(express.static(path.join(__dirname, "../client/dist")));

app.post("/start_game", (req, res) => {
  targetNumber = Math.floor(Math.random() * 100) + 1;

  console.log(targetNumber);

  res.json({ message: "Game started!" });
});

app.post("/guess", (req, res) => {
  const userGuess = Number(req.body.number);

  if (!targetNumber) {
    return res.status(400).json({ message: "Game not started!" });
  }

  if (userGuess < targetNumber) {
    res.json({ message: "Higher" });
  } else if (userGuess > targetNumber) {
    res.json({ message: "Lower" });
  } else {
    res.json({ message: "Correct! Play again?" });
    targetNumber = null;
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
