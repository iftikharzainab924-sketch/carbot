import React from "react";
import { exportChatHistory } from "./exportLogic";

// this button lets the user download their chat as a json file
function ExportButton(props) {
  function handleClick() {
    exportChatHistory(props.messages);
  }

  return (
    <button onClick={handleClick} className="export-btn">
      Download Chat
    </button>
  );
}

export { ExportButton };
