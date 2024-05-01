const db = require("../../db/db");
const userModel = {};

userModel.createUser = async (email, username, password) => {
  const createUserQuery = `
    INSERT INTO users(email, username, password) 
    VALUES ($1, $2, $3) 
    RETURNING id, username`;

  const result = await db.query(createUserQuery, [email, username, password]);
  return result.rows[0];
};

userModel.getUserMatches = async (id) => {
  const getUserMatchesQuery = `
  SELECT user_matches
  FROM users
  WHERE id = $1`;

  const result = await db.query(getUserMatchesQuery, [id]);
  return result.rows[0].user_matches;
};

userModel.getUserJokes = async (id) => {
  const getUserJokesQuery = `
  SELECT jokes_posted_id
  FROM users
  WHERE id = $1`;

  // Array of user's posted joke id's
  const userJokesResult = await db.query(getUserJokesQuery, [id]);
  const jokeIds = userJokesResult.rows[0].jokes_posted_id;
  const jokes = [];

  for (const jokeId of jokeIds) {
    const getJokeContentQuery = `
    SELECT joke_id, content
    FROM jokes
    WHERE joke_id = $1`;

    const jokeContentResult = await db.query(getJokeContentQuery, [jokeId]);
    if (jokeContentResult) jokes.push(jokeContentResult.rows[0]);
  }

  return jokes;
};

/**
 * Only for use on protected routes
 * returning all data
 */
userModel.getUserById = async (id) => {
  const getUserQuery = `
  SELECT *
  FROM users WHERE id = $1`;

  const result = await db.query(getUserQuery, [id]);
  return result.rows[0];
};

// Legacy
userModel.getUserByEmail = async (email) => {
  const getUserQuery = `
  SELECT id, username, password
  FROM users WHERE email = $1`;

  const result = await db.query(getUserQuery, [email]);
  return result.rows[0];
};

// Stretch feature
userModel.getPrefById = async (id) => {
  const getPrefByIdQuery = `
  SELECT user_preferences
  FROM users WHERE id = $1`;

  const result = await db.query(getPrefByIdQuery, [id]);
  return result.rows[0];
};

module.exports = userModel;
