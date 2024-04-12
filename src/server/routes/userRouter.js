const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')


router.post('/user', 
  userController.createUser,
  (req, res) => res.status(200).send('hi from user router')
);


module.exports = router;