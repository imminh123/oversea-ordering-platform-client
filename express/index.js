require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = parseInt(process.env.VITE_PORT || 3000);

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => console.log(`Serve React application on port ${port}`));
