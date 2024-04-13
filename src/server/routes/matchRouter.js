const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.post('/',
  matchController.checkForMatch,
  (req, res) => { res.status(200).json('match check'); }
);

module.exports = router;
