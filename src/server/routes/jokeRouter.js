const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController.js');



router.get('/', jokeController.getJoke, (req, res, next) => {
    return res.status(200).json(res.locals.joke)
})

router.post('/', jokeController.postJoke, (req, res) => res.status(200).json('joke posted'));

module.exports = router;