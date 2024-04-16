const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', 
  userController.createUser,
  (req, res) => res.status(200).json(`${res.locals.userInfo.username} account created successfully`)
);

router.post('/login',
  userController.verifyUser,
  (req, res) => {
    res.locals.authenticated ? res.status(200).json(res.locals.userObj) : res.status(200).json('incorrect password');
  }
)

module.exports = router;