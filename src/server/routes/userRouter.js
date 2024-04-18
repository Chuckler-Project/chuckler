const express = require('express');
const userController = require('../controllers/userController')
const sessionController = require('../controllers/sessionController')

const router = express.Router();

router.post('/signup', 
  userController.createUser,
  sessionController.setSSIDCookieSignUp,
  (req, res) => {
    res.locals.userExists ? res.status(200).json('username exists') :
    res.status(200).json(`${res.locals.userInfo.username} account created successfully`)
  }
);

router.post('/login',
  userController.verifyUser,
  sessionController.setSSIDCookieLogin,
  (req, res) => {
    res.locals.authenticated ? res.status(200).json(res.locals.userObj) : res.status(200).json('incorrect password or username');
  }
);

router.get('/logout',
  sessionController.removeSSIDCookie,
  (req, res) => {
    res.status(200).json('Logged out');
  }
);

module.exports = router;