const express = require("express");
const userController = require("../controllers/userController");
const jokeController = require("../controllers/jokeController");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

router.post(
  "/signup",
  userController.createUser,
  tokenController.setJWTCookie,
  userController.setIsOnlineTrue,
  (req, res) => {
    return res.status(200).json("User signed up successfully!");
  }
);

router.post(
  "/login",
  userController.verifyUser,
  tokenController.setJWTCookie,
  userController.setIsOnlineTrue,
  (req, res) => {
    return res.status(200).json("User logged in successfully!");
  }
);

router.post(
  "/logout",
  tokenController.verifyToken,
  userController.setIsOnlineFalse,
  tokenController.removeJWTCookie,
  (req, res) => {
    return res.status(200).json("User logged out successfully!");
  }
);

// Get requesting user's jokes
router.post(
  "/jokes",
  tokenController.verifyToken,
  userController.getUserJokes,
  (req, res) => {
    return res.status(200).json(res.locals.jokes);
  }
);

// Legacy - verifies if user has a jwt cookie
router.get("/verify", tokenController.verifyToken, (req, res) => {
  return res.status(200).json("Requesting user is authorized");
});

// Legacy - Get username by id
router.post("/username", userController.getUsername);

//verifies if user has a jwt cookie
// router.get("/verify", tokenController.verifySession, (req, res) => {
//   return res.status(200).json("User is authorized");
// });

module.exports = router;
