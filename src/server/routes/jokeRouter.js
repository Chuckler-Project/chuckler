const express = require('express');
const jokeController = require('../controllers/jokeController');

const router = express.Router();

// get a joke from the database
router.post('/retrieveJoke',
  jokeController.getJoke,
  jokeController.addJokeToViewed,
  (req, res) => {
    if(res.locals.joke) { 
      res.status(200).json(res.locals.joke); 
    } else {
      res.status(200).json({content: 'No new jokes. Check again later!'});
    }
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
