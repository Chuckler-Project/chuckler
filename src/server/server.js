const express = require('express');
const path = require('path');
const PORT = 3000

const app = express();

// serve static files from the build file
app.use(express.static('build'));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../dist/bundle.js'));
// });

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

module.exports = app;