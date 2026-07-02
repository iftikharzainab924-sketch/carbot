// Written By: Yasin Versiani
// shows previous chats on the left side
// new chat button starts a blank conversation, clicking old one loads previous back up

import React from "react";

function formatDate(isoString) {
  if (!isoString) return "";
  var d = new Date(isoString);
  return d.toLocaleDateString();
}

function HistorySidebar(props) {
  var chats = props.chats;
  var activeId = props.activeId;

  return (
    <div className="history-sidebar">
      <div className="history-title">History</div>

      <button className="new-chat-button" onClick={props.onNewChat}>
        + New Conversation
      </button>

      <div className="history-list">
        {chats.map(function(chat) {
          var itemClass = "history-item";
          if (chat.id === activeId) {
            itemClass = "history-item active";
          }

          return (
            <div key={chat.id} className={itemClass} onClick={function() { props.onLoadChat(chat.id); }}>
              <div className="history-item-title">{chat.title}</div>
              <div className="history-item-meta">{formatDate(chat.startedAt)} - {chat.messageCount} messages</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistorySidebar;
