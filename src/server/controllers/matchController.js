const sql = require('../../db/db');

const matchController = {};

matchController.checkForMatch = async (req, res, next) => {
  try {
    const username = 'paloma';

    const response = await sql`INSERT INTO users (username) VALUES (${username})`;

    console.log(response);

    return next();

  } catch (error) {};
}

module.exports = matchController;
