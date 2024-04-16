const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', 
  userController.createUser,
  (req, res) => res.status(200).json('hi from user router')
);


module.exports = router;