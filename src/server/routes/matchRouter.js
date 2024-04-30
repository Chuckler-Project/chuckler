const express = require("express");
const matchController = require("../controllers/matchController");
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

// Swipe right
router.post(
  "/like",
  tokenController.verifyToken,
  matchController.likeUser,
  matchController.checkMatch,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

// Swipe left
router.post(
  "/skip",
  tokenController.verifyToken,
  matchController.skipUser,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

// Unmatch
router.post(
  "/unmatch",
  tokenController.verifyToken,
  matchController.dislikeUser,
  matchController.deleteMatch,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

module.exports = router;
