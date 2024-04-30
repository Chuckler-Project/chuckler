const sql = require('../../db/db');

const reactionController = {};

// get a joke from the database that the requesting user did not write
reactionController.getReaction = async (req, res, next) => {
  try {
    const {messageId} = req.body;
    const reactionEmojiResponse = await sql`SELECT reaction_emoji FROM messages WHERE id=${messageId}`;
    let reactionEmoji = reactionEmojiResponse[0].reaction_emoji;
    res.locals.emoji = reactionEmoji;
    return next();
  } catch (err) { 
    next({
      log: `Error in getJoke middleware: ${err}`,
      message: 'An error occurred getting the joke'
    }) 
  }
}

reactionController.updateReaction = async (req, res, next) => {
  try {
    const {messageId, reaction} = req.body;
    const reactionEmojiResponse = await sql`UPDATE messages SET reaction_emoji=${reaction} WHERE id=${messageId} RETURNING reaction_emoji`;
    let data = reactionEmojiResponse[0];
    res.locals.emoji = data.reaction_emoji;
    return next();
  } catch (err) { 
    next({
      log: `Error in getJoke middleware: ${err}`,
      message: 'An error occurred getting the joke'
    }) 
  }
}
module.exports = reactionController;
