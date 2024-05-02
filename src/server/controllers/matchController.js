const sql = require("../../db/db");
const userModel = require("../models/userModel");
const matchModel = require("../models/matchModel");
const matchController = {};

matchController.checkMatch = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    const { likedUserId } = req.body;

    const likedUser = await userModel.getUserById(likedUserId);
    if (!likedUser) throw new Error("Error fetching likedUser data");

    // Check if requesting user has been liked back
    if (likedUser.users_liked.includes(id)) {
      res.locals.message = `User ${id} matched with ${likedUserId}!`;
      return next();
    }

    return res.status(200).json(res.locals.message);
  } catch (err) {
    return next({
      log: `Error in checkMatch middleware: ${err}`,
      message: `Error checking for match: ${err}`,
    });
  }
};

matchController.createMatch = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    const { likedUserId } = req.body;

    // Check if match already exists
    const matchExists = await matchModel.getMatchByUserIds(id, likedUserId); // getMatchByUserIds needs to be created
    if (matchExists) throw new Error("Match already exists");

    // Create and add match to both user's matches column
    const matchInfo = await matchModel.createMatch(id, likedUserId);
    const matchId = matchInfo.match_id;
    await matchModel.addMatchToUser(id, matchId);
    await matchModel.addMatchToUser(likedUserId, matchId);
    res.locals.match = matchInfo;

    return next();
  } catch (err) {
    return next({
      log: `Error in createMatch middleware: ${err}`,
      message: `Error creating match: ${err}`,
    });
  }
};

matchController.getPotentialMatch = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    const fetchedUser = await matchModel.getPotentialMatch(id);
    console.log("fetched User: ", fetchedUser);
    res.locals.fetchedUser = fetchedUser;
    return next();
  } catch (err) {
    return next({
      log: `Error in getPotentialMatch middleware: ${err}`,
      message: `Error fetching potential match: ${err}`,
    });
  }
};

// Swipe right, add to liked and seen
matchController.likeUser = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    const { likedUserId } = req.body;

    // Update users_seen and users_liked with likedUser
    await matchModel.addUserToSeen(id, likedUserId);
    await matchModel.addLike(id, likedUserId);
    res.locals.message = `Liked user ${likedUserId}`;

    return next();
  } catch (err) {
    return next({
      log: `Error in likeUser middleware: ${err}`,
      message: `Error liking user: ${err}`,
    });
  }
};

// Swipe left, add to seen
matchController.skipUser = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    const { userId } = req.body;

    // Update users_seen
    await matchModel.addUserToSeen(id, userId);
    res.locals.message = `Skipped user ${userId}`;

    return next();
  } catch (err) {
    return next({
      log: `Error in skipUser middleware: ${err}`,
      message: `Error skipping user: ${err}`,
    });
  }
};

// removeMatch middleware to remove likes from user
matchController.removeLikes = async (req, res, next) => {
  try {
    const { user_id_1, user_id_2 } = res.locals.match;

    // Remove from each other's likes
    await matchModel.removeLike(user_id_1, user_id_2);
    await matchModel.removeLike(user_id_2, user_id_1);

    return next();
  } catch (err) {
    return next({
      log: `Error in dislikeUser middleware: ${err}`,
      message: `Error removing like from user: ${err}`,
    });
  }
};

// In development
matchController.deleteMatch = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    const { match_id } = req.body;

    // NEED to make sure that deletion of match row cascades user_matches column
    // otherwise remove match from both user_matches columns
    const match = await matchModel.deleteMatch(match_id);
    res.locals.match = match;
    await matchModel.removeMatchFromUser(match.user_id_1, match_id);
    await matchModel.removeMatchFromUser(match.user_id_2, match_id);
    res.locals.message = `Unmatched ${match.user_id_1} from ${match.user_id_2}`;

    return next();
  } catch (err) {
    return next({
      log: `Error in deleteMatch middleware: ${err}`,
      message: `Error deleting match: ${err}`,
    });
  }
};

// LEGACY
matchController.checkForMatchLegacy = async (req, res, next) => {
  try {
    // every time a joke is liked, the user id gets added to the joke's liked_by array and the joke id gets added to the users jokes_liked array
    // then a check for match post request is triggered
    // check to see who created the like joke, then check to see if they have liked any of the likers jokes
    const { userId, creatorId } = req.body;
    // get array of jokes user has written
    const userJokesResponse =
      await sql`SELECT jokes_posted FROM users WHERE id=${userId}`;
    const userJokesArray = userJokesResponse[0].jokes_posted;
    console.log("user jokes array", userJokesArray);
    // get array of jokes creator has liked
    const creatorLikesResponse =
      await sql`SELECT jokes_liked FROM users WHERE id=${creatorId}`;
    const creatorLikesArray = creatorLikesResponse[0].jokes_liked;
    console.log("creator likes array", creatorLikesArray);
    // check to see if joke creator has liked any jokes the user has written
    let matched = false;
    const message = "No matches yet!";
    if (creatorLikesArray === null) matched = false;
    else {
      for (const joke of userJokesArray) {
        if (creatorLikesArray) {
          if (creatorLikesArray.includes(joke)) matched = true;
        }
      }
    }
    res.locals.userId = userId;
    res.locals.creatorId = creatorId;
    res.locals.matched = matched;
    return next();
  } catch (err) {
    next({
      log: `Error in checkForMatch middleware: ${err}`,
      message: `Error checking for match: ${err}`,
    });
  }
};

// LEGACY
matchController.addMatchLegacy = async (req, res, next) => {
  try {
    // add joke creator's id to users matches array and vice versa
    // if (res.locals.matched) {
    if (res.locals.matched) {
      // first check to see if the match already exists in the db
      const matchesResponse =
        await sql`SELECT matches FROM users WHERE id=${res.locals.userId}`;
      const usersMatchesArray = matchesResponse[0].matches;

      if (
        usersMatchesArray === null ||
        (Array.isArray(usersMatchesArray) &&
          !usersMatchesArray.includes(res.locals.creatorId))
      ) {
        await sql`UPDATE users SET matches=ARRAY_APPEND(matches, ${res.locals.creatorId}) WHERE id=${res.locals.userId}`;
        await sql`UPDATE users SET matches=ARRAY_APPEND(matches, ${res.locals.userId}) WHERE id=${res.locals.creatorId}`;
        res.locals.message = `You have a new match with ${res.locals.creatorId}!`;
      } else if (
        Array.isArray(usersMatchesArray) &&
        usersMatchesArray.includes(res.locals.creatorId)
      ) {
        res.locals.message = "No new matches";
      } else {
        res.locals.message = "No new matches";
      }
    } else res.locals.message = "No new matches";

    return next();
  } catch (err) {
    next({
      log: `Error in addMatch middleware: ${err}`,
      message: `Error adding match: ${err}`,
    });
  }
};

// LEGACY
matchController.retrieveMatchesLegacy = async (req, res, next) => {
  // get the array of ids for the user's matches
  try {
    const { userId } = req.body;
    const matchesResponse =
      await sql`SELECT matches FROM users WHERE id=${userId}`;
    const matchesArray = matchesResponse[0].matches;
    res.locals.matchesArray = matchesArray;
    return next();
  } catch (err) {
    next({
      log: `Error in retrieveMatches middleware: ${err}`,
      message: `Error retrieving matches: ${err}`,
    });
  }
};

// Legacy
matchController.checkIsOnlineLegacy = async (req, res, next) => {
  // build out an object with the names of the user's matches and their online status
  try {
    const matchesArray = [];
    for (const match of res.locals.matchesArray) {
      const matchUsernameResponse =
        await sql`SELECT username FROM users WHERE id=${match}`;
      const matchUsername = matchUsernameResponse[0].username;
      const matchIsOnlineResponse =
        await sql`SELECT is_online FROM users WHERE id=${match}`;
      const matchIsOnline = matchIsOnlineResponse[0].is_online;
      const matchObj = {
        id: match,
        username: matchUsername,
        isOnline: matchIsOnline,
      };
      matchesArray.push(matchObj);
    }
    res.locals.matchesArray = matchesArray;
    return next();
  } catch (err) {
    next({
      log: `Error in checkIsOnline middleware: ${err}`,
      message: `Error checking if matches are online: ${err}`,
    });
  }
};

// Legacy
matchController.findMatchesLegacy = async (req, res, next) => {
  console.log("im here people", req.params);
  const allMatches = []; //user names here
  const { id } = req.params;
  try {
    const matches = await sql`SELECT matches FROM users WHERE id=${id}`;
    console.log("matches", matches);
    const matchesArr = matches[0].matches;
    if (matchesArr === null) {
      res.locals.matches = "No matches yet!";
    } else {
      const allUsers = await sql`SELECT id, username, is_online FROM users`;
      allUsers.forEach((user) => {
        if (matchesArr.includes(user.id)) {
          allMatches.push({
            username: user.username,
            isOnline: user.is_online,
            id: user.id,
          });
        }
      });
      console.log("MIDDLEWARE MATCHES  ---->", allMatches);

      res.locals.matches = allMatches;
    }

    return next();
  } catch (err) {
    next({
      log: `Error in retrieveMatches middleware: ${err}`,
      message: `Error retrieving matches: ${err}`,
    });
  }
};

module.exports = matchController;
