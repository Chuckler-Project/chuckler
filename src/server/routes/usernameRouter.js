const express = require('express');

const usernameController = require('../controllers/usernameController');

const router = express.Router();

router.post('/getName', usernameController.getName, (req, res) => {
  res.status(200).send(res.locals.receiverName);
});

module.exports = router;
