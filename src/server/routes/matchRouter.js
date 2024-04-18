const express = require('express');
const matchController = require('../controllers/matchController');

const router = express.Router();

router.get('/:id', 
  matchController.findMatches,
  (req, res) => {
    return res.status(200).json(res.locals.matches)
})



router.post('/matches',
  matchController.retrieveMatches,
  matchController.checkIsOnline,
  (req, res) => { res.status(200).json(res.locals.matchesArray); }
);

router.post('/',
  matchController.checkForMatch,
  matchController.addMatch,
  (req, res) => { res.status(200).json(res.locals.message); }
);


module.exports = router;
