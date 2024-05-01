const db = require("../../db/db");
const jokeModel = {};

jokeModel.createJoke = async (content, creator_id) => {
  const createJokeQuery = `
    INSERT INTO jokes(content, creator_id)
    VALUES ($1, $2)
    RETURNING joke_id, content, creator_id`;

  const jokeResult = await db.query(createJokeQuery, [content, creator_id]);
  const jokeId = jokeResult.rows[0].joke_id;

  // Add joke to user table
  const addJokeQuery = `
    UPDATE users
    SET jokes_posted_id = array_append(jokes_posted_id, $1)
    WHERE id = $2`;
  await db.query(addJokeQuery, [jokeId, creator_id]);

  return jokeResult.rows[0];
};

jokeModel.updateJoke = async (content, jokeId) => {
  const updateJokeQuery = `
  UPDATE jokes
  SET content = $1
  WHERE joke_id = $2
  RETURNING joke_id, content, creator_id`;

  const updatedJokeResult = await db.query(updateJokeQuery, [content, jokeId]);
  return updatedJokeResult.rows[0];
};

jokeModel.deleteJoke = async (jokeId) => {
  const deleteJokeQuery = `
  DELETE FROM jokes
  WHERE joke_id = $1
  RETURNING joke_id, content`;

  const deletedJokeResult = await db.query(deleteJokeQuery, [jokeId]);
  return deletedJokeResult.rows[0];
};

module.exports = jokeModel;
