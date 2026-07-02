// ResetButton.js
// the reset button is a component that sits in the chat window
// when it is clicked, it clears the messages and tells the server to restart the chat/session for the user.
// written by zainab iftikhar

import React from "react";

function ResetButton({ onReset }) {

  function clickconfirm() {
    // asking user first so they dont wipe the chat accidently
    const confirmed = window.confirm("Reset the conversation? All messages will be cleared.");

    if (confirmed) {
      onReset();
    }
  }

  return (
   <button className="reset-button" onClick={clickconfirm}>
      Reset Chat
    </button>
  );

}

export default ResetButton;