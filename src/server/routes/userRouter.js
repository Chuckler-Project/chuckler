const express = require('express');
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/user', 
  userController.createUser,
  (req, res) => res.status(200).send('hi from user router')
);


module.exports = router;