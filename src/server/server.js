const express = require('express');
const path = require('path');
const PORT = 3000

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/bundle.js'));
});

app.listen(PORT, () => console.log(`Server listening on ${3000}`));