// formats the time shown on each chat message
// every message shows the time it was sent like "10:24 AM"
// written by zainab iftikhar

function getTimestamp() {
  return new Date().toISOString();
}

// takes an ISO string and returns a time like "10:24 AM"
function formatTime(isoString) {
  if (!isoString) return "";

  return new Date(isoString).toLocaleTimeString([], {
    hour:   "2-digit",
    minute: "2-digit"
  });

}
// normalizes any timestamp format to clean "08:13 PM"
// fixes inconsistency between bot and user message timestamps
function normalizeTimestamp(input) {
  if (!input) return "";

  // if it looks like an ISO string convert it
  // if it already looks like "08:13 PM" just return it as is
  if (input.includes("T") || input.includes("Z")) {
    return formatTime(input);
  }

  // try parsing it anyway in case it is a different format
  const parsed = new Date("1970-01-01 " + input);
  if (!isNaN(parsed)) {
    return parsed.toLocaleTimeString([], {
      hour:   "2-digit",
      minute: "2-digit"
    });
  }

  return input;
}

export { getTimestamp, formatTime, normalizeTimestamp };