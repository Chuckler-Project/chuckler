const express = require('express');
const userController = require('../controllers/userController')
const sessionController = require('../controllers/sessionController')

const router = express.Router();

router.post('/signup', 
  userController.createUser,
  sessionController.setSSIDCookieSignUp,
  userController.setIsOnlineTrue,
  (req, res) => {
    res.locals.userExists ? res.status(200).json('username exists') :
    res.status(200).json(`${res.locals.userInfo.username} account created successfully`)
  }
);

router.post('/login',
  userController.verifyUser,
  sessionController.setSSIDCookieLogin,
  userController.setIsOnlineTrue,
  (req, res) => {
    res.locals.authenticated ? res.status(200).json(res.locals.userObj) : res.status(200).json('incorrect password');
  }
);

router.get('/logout',
  sessionController.removeSSIDCookie,
  // change to post request to get access to username?
  // userController.setIsOnlineFalse,
  (req, res) => {
    res.status(200).json('Logged out');
  }
);

module.exports = router;