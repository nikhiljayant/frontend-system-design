const webhookUrlInput = document.getElementById('webhook-url');
const webhookList = document.getElementById('webhook-list');
const logsList = document.getElementById('logs-list');

// 1. Fetch and display registered Webhook URLs
async function fetchWebhooks() {
  const res = await fetch('/api/webhooks');
  const webhooks = await res.json();
  
  webhookList.innerHTML = '';
  
  if (webhooks.length === 0) {
    webhookList.innerHTML = '<li style="color: #888;">No webhook URLs registered yet.</li>';
    return;
  }

  webhooks.forEach(w => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${w.url}</span>
      <button class="btn-delete" onclick="deleteWebhook('${w.id}')">Delete</button>
    `;
    webhookList.appendChild(li);
  });
}

// 2. Register Webhook URL form handler
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  await fetch('/api/webhooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrlInput.value })
  });
  webhookUrlInput.value = '';
  fetchWebhooks();
});

// 3. Delete registered Webhook
async function deleteWebhook(id) {
  await fetch(`/api/webhooks/${id}`, { method: 'DELETE' });
  fetchWebhooks();
}

// 4. Trigger simulated events
async function triggerEvent(eventType, data) {
  await fetch('/api/trigger-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventType, payload: data })
  });
}

document.getElementById('btn-trigger-order').onclick = () => {
  triggerEvent('order.created', { orderId: 'ORD-12345', amount: 99.99 });
};

document.getElementById('btn-trigger-payment').onclick = () => {
  triggerEvent('payment.success', { paymentId: 'PAY-55555', status: 'PAID' });
};

// 5. Fetch and display event logs
async function fetchLogs() {
  const res = await fetch('/api/logs');
  const logs = await res.json();
  
  logsList.innerHTML = '';
  
  if (logs.length === 0) {
    logsList.innerHTML = '<li style="color: #888; text-align: center;">No activity logs yet.</li>';
    return;
  }
  
  logs.forEach(log => {
    const li = document.createElement('li');
    
    // Choose list item style class based on type
    if (log.type === 'inbound') {
      li.className = 'log-inbound';
    } else {
      // If outbound failed, style it as error, otherwise outbound success style
      li.className = log.message.includes('Failed') ? 'log-error' : 'log-outbound';
    }
    
    const formattedTime = new Date(log.timestamp).toLocaleTimeString();
    
    li.innerHTML = `
      <span class="log-time">[${formattedTime}] ${log.type.toUpperCase()}</span>
      <strong>${log.message}</strong>
      <span class="log-payload-json">${JSON.stringify(log.payload, null, 2)}</span>
    `;
    logsList.appendChild(li);
  });
  
  // Keep scrollbar at the bottom of the logs list
  logsList.scrollTop = logsList.scrollHeight;
}

// 6. Clear Logs handler
document.getElementById('btn-clear').onclick = async () => {
  await fetch('/api/logs/clear', { method: 'POST' });
  fetchLogs();
};

// Initial fetch
fetchWebhooks();
fetchLogs();

// Check for new logs in the background every 1.5 seconds
setInterval(fetchLogs, 1500);
