const express = require('express');
const userController = require('./controllers/userController')
const path = require('path');
const PORT = 3000;

const app = express();

// serve static files from the build file
app.use(express.static('build'));

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../dist/bundle.js'));
// });

app.post('/user', 
  userController.createUser,
  (req, res) => res.status(200).send()
);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

module.exports = app;