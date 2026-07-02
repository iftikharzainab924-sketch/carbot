// Written By: Yasin Versiani

const { getBotResponse } = require("./intentScanner");
const { getSteeringQuestion } = require("./steering");
const { handleFallback, resetFallbackCounter } = require("./fallback");
const { addToHistory, getHistory, clearHistory } = require("./historyHandler");
const { preventRepeat } = require("./logicPolish");

let turnCount = 0;

function incrementTurn() {
  turnCount += 1;
}

function getTurnCount() {
  return turnCount;
}

function resetTurnCount() {
  turnCount = 0;
}



function handleMessage(userText) {
  incrementTurn();

  addToHistory({ sender: "user", text: userText });

  let botReply = getBotResponse(userText);

  if (!botReply) {
    botReply = handleFallback();

    if (botReply === "__HARD_RESET__") {
      clearHistory();
      resetTurnCount();
      resetFallbackCounter();
      botReply = "I got confused sorry! Let us start fresh. Which car brand are you curious about, BMW, Tesla, or Audi?";
    }
  } else {
    botReply = preventRepeat(botReply, getHistory());
    resetFallbackCounter();

    const q = getSteeringQuestion(getHistory());
    botReply = botReply + " " + q;
  }

  // Saves the bot's reply into history as well
  addToHistory({ sender: "bot", text: botReply });

  return botReply;
}


module.exports = { handleMessage, getTurnCount, resetTurnCount };