const db = require("../../db/db");
const userModel = require("../models/userModel");
const jokeModel = require("../models/jokeModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userController = {};
userController.createUser = async (req, res, next) => {
  try {
    const { email, username, password, joke } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userExists = await userModel.getUserByEmail(email);
    if (userExists) throw new Error(`User already exists`);

    // Create new user
    const userInfo = await userModel.createUser(
      email,
      username,
      hashedPassword
    );
    if (!userInfo) throw new Error("Error creating user");
    res.locals.userInfo = userInfo;

    // Create user's first joke
    const jokeInfo = await jokeModel.createJoke(joke, userInfo.id);
    if (!jokeInfo) throw new Error("Error creating first joke");

    // Add more user info such as age, gender, location
    // Profile picture url and bio
    // Set preferences for matching

    return next();
  } catch (err) {
    return next({
      log: `Error in createUser middleware: ${err}`,
      message: `Error creating user: ${err}`,
    });
  }
};

//checks to see if user has a username/password saved in database
userController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.getUserByEmail(email);
    if (!user) return res.status(404).json("User not found");

    const hashedPassword = user.password;
    delete user.password;

    // Check if passwords match
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPassword) return res.status(401).json("Incorrect password");

    // Pass user to setJWTCookie
    res.locals.userInfo = user;

    return next();
  } catch (err) {
    return next({
      log: `Error in verifyUser middleware: ${err}`,
      message: `Error verifying user: ${err}`,
    });
  }
};

// Returns requesting user's matches
userController.getUserMatches = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;

    // Get matches by user id
    const user_matches = await userModel.getUserMatches(id);
    res.locals.matches = user_matches;

    return next();
  } catch (err) {
    return next({
      log: `Error in getUserMatches middleware: ${err}`,
      message: `Error getting user matches: ${err}`,
    });
  }
};

// Returns requesting user's jokes
userController.getUserJokes = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;

    const userJokes = await userModel.getUserJokes(id);
    if (!userJokes) throw new Error("Error fetching user's jokes");
    res.locals.jokes = userJokes;

    return next();
  } catch (err) {
    return next({
      log: `Error in getUserJokes middleware: ${err}`,
      message: `Error fetching user jokes: ${err}`,
    });
  }
};

// Returns requesting user's profile info - currently returning all user data
userController.getUserProfile = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;

    const userInfo = await userModel.getUserById(id);
    res.locals.userInfo = userInfo;

    return next();
  } catch (err) {
    return next({
      log: `Error in getUserProfile middleware: ${err}`,
      message: `Error fetching user profile: ${err}`,
    });
  }
};

//set's user's online status to true
userController.setIsOnlineTrue = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    await db.query(`UPDATE users SET is_online=true WHERE id=$1`, [id]);
    return next();
  } catch (err) {
    next({
      log: `Error in userController.setIsOnlineTrue middleware: ${err}`,
      message: `Error setting user isOnline status: ${err}`,
    });
  }
};

//set's user's online status to false
userController.setIsOnlineFalse = async (req, res, next) => {
  try {
    const { id } = res.locals.userInfo;
    await db.query(`UPDATE users SET is_online=false WHERE id=$1`, [id]);
    return next();
  } catch (err) {
    next({
      log: `Error in userController.setIsOnlineFalse middleware: ${err}`,
      message: `Error setting user isOnline status: ${err}`,
    });
  }
};

// legacy
userController.getUsernameLegacy = async (req, res, next) => {
  try {
    const { id } = req.body;
    const response = await db.query(`SELECT username from users where id=$1`, [
      id,
    ]);
    return res.send(response.rows[0]);
  } catch (err) {
    next({
      log: `Error in userController.getUsername middleware: ${err}`,
      message: `Error getting username : ${err}`,
    });
  }
};
module.exports = userController;
