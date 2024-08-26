const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const app = express();

const PORT = process.env.PORT || 50001;

app.use(bodyParser.json());

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

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

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to Guess the Number Game! Click the button below to play.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Play Game",
              web_app: { url: "https://guess-game-production.up.railway.app/" },
            },
          ],
        ],
      },
    }
  );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
