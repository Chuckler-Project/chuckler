const express = require("express");
const jokeController = require("../controllers/jokeController");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

// post a joke to the database
router.post(
  "/",
  tokenController.verifyToken,
  jokeController.postJoke,
  (req, res) => {
    return res.status(200).json(res.locals.joke);
  }
);

router.patch(
  "/update",
  tokenController.verifyToken,
  jokeController.updateJoke,
  (req, res) => {
    return res.status(200).json(res.locals.joke);
  }
);

router.delete(
  "/delete",
  tokenController.verifyToken,
  jokeController.deleteJoke,
  (req, res) => {
    return res.status(200).json(res.locals.joke);
  }
);

// Legacy - get a joke from the database
router.post(
  "/retrieveJoke",
  jokeController.getJoke,
  jokeController.addJokeToViewed,
  (req, res) => {
    res.status(200).json(res.locals.joke);
  }
);

// Legacy - like a joke
router.post("/like", jokeController.likeJoke, (req, res) => {
  res.status(200).json(res.locals.likeMessage);
});

module.exports = router;
