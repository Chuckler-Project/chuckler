const sql = require('../../db/db');

const matchController = {};

matchController.checkForMatch = async (req, res, next) => {
  try {
    // every time a joke is liked, the user id gets added to the joke's liked_by array and the joke id gets added to the users jokes_liked array
    // then a check for match post request is triggered
    // who created the liked joke? see if they have liked any of the likers jokes
    const { userId, creatorId } = req.body;
    // get array of jokes user has written
    const userJokesResponse = await sql`SELECT jokes_posted FROM users WHERE id=${userId}`;
    const userJokesArray = userJokesResponse[0].jokes_posted;
    // get array of jokes creator has liked
    const creatorLikesResponse = await sql`SELECT jokes_liked FROM users WHERE id=${creatorId}`;
    const creatorLikesArray = creatorLikesResponse[0].jokes_liked;
    // check to see if joke creator has liked any jokes the user has written
    let matched = false;
    let message = 'No matches yet!'
    for (const joke of userJokesArray) {
      if (creatorLikesArray) {
        if (creatorLikesArray.includes(joke)) matched = true;
      };
    };
    if (matched) message = `${userId} matched with ${creatorId}!`;
    res.locals.message = message;
    return next();
  } catch (err) {
    next({
      log: `Error in checkForMatch middleware: ${err}`,
      message: `Error checking for match: ${err}`
    });
  };
}

module.exports = matchController;
