const express = require("express");
const matchController = require("../controllers/matchController");
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");
const chatModel = require("../models/chatModel");

const router = express.Router();

// Used to fetch random potential match
router.post(
  "/fetch",
  tokenController.verifyToken,
  matchController.getPotentialMatch,
  (req, res) => {
    return res.status(200).json(res.locals.fetchedUser);
  }
);

// TEMP
router.post(
  "/messages",
  tokenController.verifyToken,
  async (req, res, next) => {
    try {
      const { match_id } = req.body;
      const messages = await chatModel.getMessages(match_id);
      return res.status(200).json(messages);
    } catch (err) {
      return next({});
    }
  }
);
// Swipe right
router.post(
  "/like",
  tokenController.verifyToken,
  matchController.likeUser,
  matchController.checkMatch,
  matchController.createMatch,
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
  matchController.deleteMatch,
  matchController.removeLikes,
  (req, res) => {
    return res.status(200).json(res.locals.message);
  }
);

module.exports = router;
