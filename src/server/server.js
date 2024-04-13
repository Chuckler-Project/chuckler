const express = require('express');
const userController = require('./controllers/userController')
const path = require('path');
const PORT = 3000;
const app = express();
const jokeRouter = require('../server/routes/jokeRouter.js')
const userRouter = require('../server/routes/userRouter.js')




// serve static files from the build file
app.use(express.static('build'));
app.use(express.json());
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../dist/bundle.js'));
// });

app.use('/api/user', userRouter);
app.use('/api/joke', jokeRouter);


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

module.exports = app;