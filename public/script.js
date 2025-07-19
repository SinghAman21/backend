const CACHE_KEY = 'cachedMessageData';
const MAX_AGE =  20 * 1000; // 20 seconds in milliseconds

function getCachedData() {
  const item = localStorage.getItem(CACHE_KEY);
  if (!item) return null;

  const parsed = JSON.parse(item);
  const isExpired = Date.now() - parsed.timestamp > MAX_AGE;

  return isExpired ? null : parsed.data;
}

function setCachedData(data) {
  const entry = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
}

// Main logic
const messageEl = document.getElementById('message');
const cached = getCachedData();

if (cached) {
  messageEl.textContent = 'From localStorage: ' + cached.message;
} else {
  fetch('/api/message')
    .then(res => res.json())
    .then(data => {
      setCachedData(data);
      messageEl.textContent = 'From server: ' + data.message;
    });
}
