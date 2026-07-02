// Written By: Yasin Versiani

// handles soft and hard fallback
let failureCount = 0;


const softFallbacks = [
  "I am not sure what car you mean, can you rephrase?",
  "Hmm I didnt get that, can you mention a brand like BMW or Tesla?",
  "Can you say that differently? Try typing a car brand.",
  "That went over my head! Try asking about a specific car."
];



function handleFallback() {
  failureCount += 1;

  if (failureCount >= 3) {
    return "__HARD_RESET__";
  }

  const index = (failureCount - 1) % softFallbacks.length;
  return softFallbacks[index];
}

// reset after successful match
function resetFallbackCounter() {
  failureCount = 0;
}

function getFailureCount() {
  return failureCount;
}

module.exports = { handleFallback, resetFallbackCounter, getFailureCount };
