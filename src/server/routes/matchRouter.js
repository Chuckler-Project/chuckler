const express = require('express');

const router = express.Router();
const matchController = require('../controllers/matchController');

// get a joke from the database
router.get(
  '/',
  jokeController.getJoke,
  (req, res) => { res.status(200).json(res.locals.joke); }
);

// post a joke to the database
router.post(
  '/',
  jokeController.postJoke,
  (req, res) => { res.status(200).json('joke posted'); }
);

module.exports = router;
