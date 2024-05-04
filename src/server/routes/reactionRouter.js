const express = require('express');
const reactionController = require('../controllers/reactionController');

const router = express.Router();

// get a joke from the database
router.post('/getreaction',
reactionController.getReaction,
  (req, res) => { res.status(200).json(res.locals.emoji); }
);

router.post('/updatereaction',
reactionController.updateReaction,
  (req, res) => { res.status(200).json(res.locals.emoji); }
);

module.exports = router;
