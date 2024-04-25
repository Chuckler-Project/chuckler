const express = require('express');
const userController = require('../controllers/userController')
const sessionController = require('../controllers/tokenController');
const { useInRouterContext, UNSAFE_NavigationContext } = require('react-router-dom');

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
  userController.setIsOnlineFalse,
  (req, res) => {
    res.status(200).json('Logged out');
  }
);
router.get('/logout',
  (req, res) => {
    res.clearCookie('jwt')
    res.send('Cookie cleared');
  }
);
//verifies if user has a jwt cookie
router.get('/verify',sessionController.verifySession);
router.post('/username',userController.getUsername);
module.exports = router;