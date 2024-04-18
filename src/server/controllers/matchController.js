const sql = require('../../db/db');

const matchController = {};

matchController.checkForMatch = async (req, res, next) => {
  try {
    // every time a joke is liked, the user id gets added to the joke's liked_by array and the joke id gets added to the users jokes_liked array
    // then a check for match post request is triggered
    // check to see who created the like joke, then check to see if they have liked any of the likers jokes
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
    if (matched) {
      message = `${userId} matched with ${creatorId}!`;
      res.locals.userId = userId;
      res.locals.creatorId = creatorId;
    }
    //CHANGED THE RESPONSE TO BOOLEAN
    res.locals.message = matched;
    return next();
  } catch (err) {
    next({
      log: `Error in checkForMatch middleware: ${err}`,
      message: `Error checking for match: ${err}`
    });
  };
}

matchController.addMatch = async (req, res, next) => {
  try {
    // add joke creator's id to users matches array and vice versa
    await sql`UPDATE users SET matches=ARRAY_APPEND(matches, ${res.locals.creatorId}) WHERE id=${res.locals.userId}`;
    await sql`UPDATE users SET matches=ARRAY_APPEND(matches, ${res.locals.userId}) WHERE id=${res.locals.creatorId}`;
    console.log(`match between ${res.locals.creatorId} and ${res.locals.userId} noted in db`)
    return next();
  } catch (err) {
    next({
      log: `Error in addMatch middleware: ${err}`,
      message: `Error adding match: ${err}`
    });
  };
}

matchController.retrieveMatches = async (req, res, next) => {
  // get the array of ids for the user's matches
  try {
    const {userId} = req.body;
    const matchesResponse = await sql`SELECT matches FROM users WHERE id=${userId}`;
    const matchesArray = matchesResponse[0].matches;
    res.locals.matchesArray = matchesArray;
    console.log(matchesArray);
    return next();
  } catch (err) {
    next({
      log: `Error in retrieveMatches middleware: ${err}`,
      message: `Error retrieving matches: ${err}`
    });
  };
};

matchController.checkIsOnline = async (req, res, next) => {
  // build out an object with the names of the user's matches and their online status
  try {
    const matchesArray = [];
    for (const match of res.locals.matchesArray) {
      const matchUsernameResponse = await sql`SELECT username FROM users WHERE id=${match}`;
      const matchUsername = matchUsernameResponse[0].username;
      const matchIsOnlineResponse = await sql`SELECT is_online FROM users WHERE id=${match}`;
      const matchIsOnline = matchIsOnlineResponse[0].is_online;
      const matchObj = {
        id: match,
        username: matchUsername,
        isOnline: matchIsOnline
      }
      matchesArray.push(matchObj);
    }
    res.locals.matchesArray = matchesArray;
    return next();
  } catch (err) {
    next({
      log: `Error in checkIsOnline middleware: ${err}`,
      message: `Error checking if matches are online: ${err}`
    });
  };
};

module.exports = matchController;
