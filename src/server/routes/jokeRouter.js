const express = require('express');
const jokeController = require('../controllers/jokeController');

const router = express.Router();

// get a joke from the database
router.get('/',
  jokeController.getJoke,
  (req, res) => { res.status(200).json(res.locals.joke); }
);

// post a joke to the database
router.post('/',
  jokeController.postJoke,
  (req, res) => { res.status(200).json('joke posted'); }
);

// like a joke
router.post('/like',
  jokeController.likeJoke,
  (req, res) => { res.status(200).json(res.locals.likeMessage); }
);

module.exports = router;
