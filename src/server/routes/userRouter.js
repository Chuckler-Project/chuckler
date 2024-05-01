const express = require('express');
const userController = require('../controllers/userController')
const sessionController = require('../controllers/tokenController')
const sql = require('../../db/db');

const router = express.Router();

router.post('/signup',
  userController.createUser,
  sessionController.setJWTCookieSignUp,
  userController.setIsOnlineTrue,
  (req, res) => {
    res.locals.userExists ? res.status(200).json('username exists') :
      res.status(200).json(res.locals.userInfo)
  }
);

router.post('/login',
  userController.verifyUser,
  sessionController.setJWTCookieLogin,
  userController.setIsOnlineTrue,
  (req, res) => {
    res.locals.authenticated ? res.status(200).json(res.locals.userObj) : res.status(200).json('incorrect password or username');
  }
);

router.post('/logout',
  sessionController.removeJWTCookie,
  userController.setIsOnlineFalse,
  (req, res) => {
    res.status(200).json('Logged out');
  }
);

router.get('/bio/:userId',
  userController.viewUser,
  (req, res) => {
    res.status(200).json('User bio logic here');
  },
);

module.exports = router;
