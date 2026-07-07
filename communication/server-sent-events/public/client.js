// Get HTML DOM elements
const statusElement = document.getElementById('status');
const messagesList = document.getElementById('messages');

// 1. Establish connection to the server-sent events endpoint
const eventSource = new EventSource('/server-sent-events');

// 2. Handle connection open event
eventSource.onopen = () => {
  statusElement.textContent = 'Connected';
  statusElement.className = 'connected';
};

// 3. Handle incoming message events from the server
eventSource.onmessage = (event) => {
  // Create a new list item for the message
  const newMsg = document.createElement('li');
  newMsg.textContent = event.data;
  messagesList.appendChild(newMsg);
  
  // Keep the list scrolled to the bottom
  messagesList.scrollTop = messagesList.scrollHeight;
};

// 4. Handle connection error/retry status
// Note: EventSource automatically attempts to reconnect on failure
eventSource.onerror = () => {
  statusElement.textContent = 'Disconnected / Reconnecting...';
  statusElement.className = 'disconnected';
};
