const express = require('express');
const app = express();
const PORT = 3000;

// Serve everything inside public/ folder
app.use(express.static('public'));

// API route with caching
app.get('/api/message', (req, res) => {
    //MVP line for browser cache
  res.set('Cache-Control', 'public, max-age=20'); // Cache for 20 seconds   
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
