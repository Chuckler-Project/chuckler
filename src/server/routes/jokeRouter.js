const express = require('express');
const jokeController = require('../controllers/jokeController');

const router = express.Router();

// get a joke from the database
router.post('/retrieveJoke',
  jokeController.getJoke,
  (req, res) => { 
    // console.log('response from the router JOKE', res.locals.joke)
    res.status(200).json(res.locals.joke);
   }
);

// like a joke
router.post('/like',
  jokeController.likeJoke,
  (req, res) => { res.status(200).json(res.locals.likeMessage); }
);

// post a joke to the database
router.post('/',
  jokeController.postJoke,
  (req, res) => { res.status(200).json('joke posted'); }
);

module.exports = router;
