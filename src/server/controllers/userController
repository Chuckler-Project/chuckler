const sql = require('../../db/db');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const username = 'paloma';

    const response = await sql`INSERT INTO users (username) VALUES (${username})`;

    console.log(response);

    return next();

  } catch (error) {console.log('error in userController', error)};
}

module.exports = userController;
