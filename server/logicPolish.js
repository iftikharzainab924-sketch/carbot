// Written By: Yasin Versiani

// prevents the bot from repeating responses

function preventRepeat(reply, history) {
  const previousBotMsgs = history
    .filter(msg => msg.sender === "bot")
    .map(msg => msg.text);


  if (previousBotMsgs.some(function(msg) { return msg.includes(reply.split(".")[0]); })) {
    // already said this, return something else
    return "I think I already mentioned that! Let me think of something else. What other car are you curious about?";
  }

  return reply;
}


function isConversationLong(turnCount) {
  return turnCount > 20;
}

module.exports = { preventRepeat, isConversationLong };