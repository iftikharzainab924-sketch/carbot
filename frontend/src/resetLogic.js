// resetLogic.js
// the actual reset logic/function that runs when the Reset button is clicked by users
// It clears the messages on screen and tells the server to wipe the session too
// written by zainab iftikhar

// checks if there are any messages to reset
// no point showing the confirm dialog if the chat is already empty
function isChatEmpty(messages) {
  return !messages || messages.length === 0;
}

function handleReset(setMessages, socket) {
  // clear all messages from the chat screen
  // setMessages comes from Muhammad's App.js file
  setMessages([]);

  // tell the server to clear history and turn counter on Yasin's side
  if (socket) {
    socket.emit("reset_conversation");
  }
  // after resetting, the server sends a new welcome message
}

export { handleReset, isChatEmpty };