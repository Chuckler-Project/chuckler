const sql = require('../../db/db');

const matchController = {};

matchController.checkForMatch = async (req, res, next) => {
  try {
    // every time a joke is liked, the user id gets added to the joke's liked_by array and the joke id gets added to the users jokes_liked array
    // then a check for match post request is triggered
    // who created the liked joke? see if they have liked any of the likers jokes
    const { userId, creatorId } = req.body;
    const usersJokesReponse = await sql`SELECT jokes_posted FROM users WHERE id=${userId}`;

  } catch (error) {};
}

module.exports = matchController;
