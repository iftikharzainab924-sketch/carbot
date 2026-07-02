// Written By: Yasin Versiani

let conversationHistory = [];

function addToHistory(msg) {
  conversationHistory.push(msg);
}

function getHistory() {
  return conversationHistory;
}

function clearHistory() {
  conversationHistory = [];
}

function getBotMessages() {
  return conversationHistory
    .filter(msg => msg.sender === "bot")
    .map(msg => msg.text);
}

module.exports = { addToHistory, getHistory, clearHistory, getBotMessages };