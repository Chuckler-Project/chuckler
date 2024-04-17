const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.post('/matches',
  matchController.retrieveMatches,
  matchController.checkIsOnline,
  (req, res) => { res.status(200).json(res.locals.matchesObj); }
);

router.post('/',
  matchController.checkForMatch,
  matchController.addMatch,
  (req, res) => { res.status(200).json(res.locals.message); }
);


module.exports = router;
