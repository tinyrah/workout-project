const express = require('express');
const app = express();
const port = 4000; // use a different port from your React app

app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
