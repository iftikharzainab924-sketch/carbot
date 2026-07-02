// socketHandler.js
// THE connection layer between the frontend and the backend
// it listens for messages from Muhammad's frontend and passes them to Yasin's engine
// written by Zainab
// also added the multi chat history stuff for the sidebar

const { handleMessage, resetTurnCount } = require("./engine");
const { clearHistory, getHistory, addToHistory } = require("./historyHandler");
const { resetFallbackCounter } = require("./fallback");
const { signup, login } = require("./userAccounts");
const { getActiveChat, saveChat, newChat, switchChat, getChatList } = require("./savedChats");

function handleSocketEvents(socket, io) {

  // keeps track of who is logged in on this connection
  let currentUser = null;
  // which chat we are currently saving messages into
  let currentChatId = null; 
  // sends the opening bot message, used on first login and on new chat
  function greet() {
    const text = "Welcome to Autobot! I know everything about cars. Which car brand are you curious about, BMW, Tesla, Ferrari, or something else?";
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    socket.emit("bot_message", { text: text, timestamp: timestamp });
    addToHistory({ sender: "bot", text: text, timestamp: timestamp });
    saveChat(currentUser, currentChatId, getHistory());
  }

  // updates the history sidebar
  function pushChatList() {
    socket.emit("chat_list", {
      chats: getChatList(currentUser),
      activeId: currentChatId
    });
  }

  // user submitted the signup form
  socket.on("signup", function(data) {
    const result = signup(data.username, data.password);
    socket.emit("auth_result", result);
  });

  // user submitted the login form
  socket.on("login", function(data) {
    const result = login(data.username, data.password);

    if (!result.ok) {
      socket.emit("auth_result", result);
      return;
    }

    currentUser = data.username;
    const active = getActiveChat(currentUser);
    currentChatId = active.id;
    // load saved messages back into memory so steering / no-repeat still works
    clearHistory();
    resetTurnCount();
    resetFallbackCounter();
    active.messages.forEach(function(msg) {
      addToHistory(msg);
    });

    socket.emit("auth_result", { ok: true, user: { username: currentUser } });

    if (active.messages.length > 0) {
      socket.emit("history_loaded", { history: active.messages });
    } else {
      greet();
    }

    pushChatList();
  });

  // user clicked logout
  socket.on("logout", function() {
    currentUser = null;
    currentChatId = null;
    clearHistory();
    resetTurnCount();
    resetFallbackCounter();
  });


  // main event - user typed something and hit send
  // small delay so it doesnt feel like an instant robot response and data.text comes from Muhammad's UserInput.js file
  socket.on("user_message", function(data) {
    const userText = data.text || "";

    if (userText.trim() === "") return; // ignore blank msg
    if (!currentUser) return;  // ignore not logged in user's


    // 600ms feels natural response time
    setTimeout(function() {
      const reply = handleMessage(userText);

      socket.emit("bot_message", {
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });
      // save the updated history for this user so it persists between sessions
      saveChat(currentUser, currentChatId, getHistory());
      pushChatList();
    }, 600);
  });

  // reset event, when user clicks the Reset button
  // clears everything on the backend side and sends opening message again
  socket.on("reset_conversation", function() {
    clearHistory();
    resetTurnCount();
    resetFallbackCounter();

    // small delay before responding so the screen clears first
    setTimeout(function() {
      const text = "Chat has been reset. Let us start again! Which car are you curious about?";
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      socket.emit("bot_message", { text: text, timestamp: timestamp });

      if (currentUser) {
        addToHistory({ sender: "bot", text: text, timestamp: timestamp });
        saveChat(currentUser, currentChatId, getHistory());
        pushChatList();
      }
    }, 300);
  });

  // "New Conversation" button in the sidebar
  socket.on("new_conversation", function() {
    if (!currentUser) return;

    const chat = newChat(currentUser);
    currentChatId = chat.id;

    clearHistory();
    resetTurnCount();
    resetFallbackCounter();

    greet();
    socket.emit("history_loaded", { history: getHistory() });
    pushChatList();
  });
  
  // clicking an old chat in the sidebar
  socket.on("load_conversation", function(data) {
    if (!currentUser) return;

    const chat = switchChat(currentUser, data.id);
    if (!chat) return;

    currentChatId = chat.id;

    clearHistory();
    resetTurnCount();
    resetFallbackCounter();
    chat.messages.forEach(function(msg) {
      addToHistory(msg);
    });

    socket.emit("history_loaded", { history: chat.messages });
    pushChatList();
  });
  // user closed the tab or lost connection
  socket.on("disconnect", function() {
    console.log("[socketHandler] user disconnected:", socket.id);
    currentUser = null;
    currentChatId = null;
  });
}

module.exports = { handleSocketEvents };
