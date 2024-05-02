const db = require("../../db/db");
const matchModel = {};

matchModel.createMatch = async (user_id_1, user_id_2) => {
  const createMatchQuery = `
  INSERT INTO matches(user_id_1, user_id_2)
  VALUES ($1, $2)
  RETURNING *`;

  const result = await db.query(createMatchQuery, [user_id_1, user_id_2]);
  return result.rows[0];
};

matchModel.getPotentialMatch = async (id) => {
  const getPotentialMatchQuery = `
  SELECT id, username, jokes_posted_id, bio
  FROM users
  WHERE id <> $1
  AND id NOT IN (SELECT unnest(users_seen) FROM users WHERE id = $1)
  ORDER BY RANDOM()`;

  const result = await db.query(getPotentialMatchQuery, [id]);
  return result.rows[0];
};

matchModel.getMatchByUserIds = async (user_id_1, user_id_2) => {
  const getMatchByUsersQuery = `
  SELECT *
  FROM matches
  WHERE (user_id_1 = $1 AND user_id_2 = $2)
  OR (user_id_1 = $2 AND user_id_2 = $1);`;

  const result = await db.query(getMatchByUsersQuery, [user_id_1, user_id_2]);
  return result.rows[0];
};

matchModel.addMatchToUser = async (id, match_id) => {
  const addNewMatchQuery = `
  UPDATE users
  SET user_matches = array_append(user_matches, $1)
  WHERE id = $2
  RETURNING user_matches`;

  const result = await db.query(addNewMatchQuery, [match_id, id]);
  return result.rows[0];
};

matchModel.removeMatchFromUser = async (id, match_id) => {
  const addNewMatchQuery = `
  UPDATE users
  SET user_matches = array_remove(user_matches, $1)
  WHERE id = $2
  RETURNING user_matches`;

  const result = await db.query(addNewMatchQuery, [match_id, id]);
  return result.rows[0];
};

matchModel.addUserToSeen = async (id, likedUserId) => {
  const addUserToSeenQuery = `
  UPDATE users
  SET users_seen = array_append(users_seen, $1)
  WHERE id = $2`;

  const result = await db.query(addUserToSeenQuery, [likedUserId, id]);
  return result.rows[0];
};

matchModel.addLike = async (id, likedUserId) => {
  const addLikeQuery = `
  UPDATE users
  SET users_liked = array_append(users_liked, $1)
  WHERE id = $2`;

  const result = await db.query(addLikeQuery, [likedUserId, id]);
  return result.rows[0];
};

matchModel.removeLike = async (id, unlikedUserId) => {
  const removeLikeQuery = `
  UPDATE users
  SET users_liked = array_append(users_liked, $1)
  WHERE id = $2`;

  const result = await db.query(removeLikeQuery, [unlikedUserId, id]);
  return result.rows[0];
};

matchModel.getMatchById = async (match_id) => {
  const getMatchByIdQuery = `
  SELECT * 
  FROM matches
  WHERE match_id = $1`;

  const match = await db.query(getMatchByIdQuery, [match_id]);
  return match.results[0];
};

matchModel.deleteMatch = async (match_id) => {
  const deleteMatchQuery = `
  DELETE FROM matches
  WHERE match_id = $1
  RETURNING match_id, user_id_1, user_id_2`;

  const match = await db.query(deleteMatchQuery, [match_id]);
  return match.results[0];
};

module.exports = matchModel;
