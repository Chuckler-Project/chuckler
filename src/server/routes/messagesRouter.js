const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.post('/getNewMessagesStatus',
  chatController.getNewMessagesStatus,
  (req, res) => {
    res.status(200).json(res.locals.newMessageStatus);}
);

router.post('/markMessagesAsRead',
  chatController.markMessagesAsRead,
  (req, res) => {
    res.sendStatus(200);}
);

module.exports = router;
